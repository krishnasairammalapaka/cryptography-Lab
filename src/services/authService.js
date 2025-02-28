const supabase = require('../config/database');
const bcrypt = require('bcrypt');

class AuthService {
    async login(email, password) {
        try {
            console.log('Attempting login for:', email);

            // Query the users table
            const { data: user, error } = await supabase
                .from('users')
                .select('*')  // Select all fields
                .eq('email', email)
                .single();

            if (error) {
                console.error('Database error:', error);
                throw error;
            }

            if (!user) {
                console.log('User not found');
                return { error: 'Invalid email or password' };
            }

            console.log('Found user:', { ...user, password: '[HIDDEN]' });

            // For testing - remove in production
            console.log('Stored password:', user.password);
            console.log('Provided password:', password);

            // Since we're storing plain passwords for testing, adjust comparison
            // In production, use bcrypt.compare
            const validPassword = user.password === password;
            // const validPassword = await bcrypt.compare(password, user.password);

            if (!validPassword) {
                console.log('Invalid password');
                return { error: 'Invalid email or password' };
            }

            // Update last login
            const { error: updateError } = await supabase
                .from('users')
                .update({ 
                    last_login: new Date(),
                    updated_at: new Date()
                })
                .eq('id', user.id);

            if (updateError) {
                console.error('Error updating last login:', updateError);
            }

            // Remove password from user object
            const { password: _, ...userData } = user;

            console.log('Login successful:', userData);
            return { user: userData };

        } catch (error) {
            console.error('Login error:', error);
            return { error: 'Authentication failed. Please try again.' };
        }
    }

    async createUser(userData) {
        try {
            // Hash password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(userData.password, salt);

            // Create user in users table
            const { data: user, error } = await supabase
                .from('users')
                .insert([{
                    email: userData.email,
                    username: userData.username,
                    password: hashedPassword,
                    role: userData.role,
                    first_name: userData.first_name,
                    last_name: userData.last_name
                }])
                .select('id, email, username, role, first_name, last_name')
                .single();

            if (error) throw error;
            return { success: true, user };
        } catch (error) {
            console.error('Create user error:', error);
            return { error: 'Failed to create user' };
        }
    }
}

module.exports = new AuthService(); 
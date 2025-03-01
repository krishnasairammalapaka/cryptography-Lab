const supabase = require('../config/database');
const bcrypt = require('bcrypt');

class AuthService {
    async login(email, password) {
        try {
            console.log('Attempting login for:', email);

            // First check if user exists in the users table
            const { data: user, error: userError } = await supabase
                .from('users')
                .select('*')
                .eq('email', email)
                .single();

            if (userError) {
                console.error('User fetch error:', userError);
                return { error: 'Invalid email or password' };
            }

            if (!user) {
                console.log('User not found');
                return { error: 'Invalid email or password' };
            }

            // For existing users, verify password directly
            // Note: This is temporary until all users are migrated to Supabase Auth
            const validPassword = user.password === password; // or use bcrypt.compare if passwords are hashed

            if (!validPassword) {
                console.log('Invalid password');
                return { error: 'Invalid email or password' };
            }

            // Create a session object similar to Supabase Auth
            const session = {
                user_id: user.id,
                created_at: new Date().toISOString(),
                expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // 24 hours from now
            };

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

            const userData = {
                ...user,
                session
            };

            console.log('Login successful:', { ...userData, password: '[HIDDEN]', session: '[HIDDEN]' });
            return { user: userData };

        } catch (error) {
            console.error('Login error:', error);
            return { error: 'Authentication failed. Please try again.' };
        }
    }

    async createUser(userData) {
        try {
            // For now, create user directly in users table
            // Later we can migrate to using Supabase Auth
            const { data: profile, error: profileError } = await supabase
                .from('users')
                .insert([{
                    email: userData.email,
                    username: userData.username,
                    password: userData.password, // Note: In production, hash this password
                    role: userData.role,
                    first_name: userData.first_name,
                    last_name: userData.last_name,
                    created_at: new Date(),
                    updated_at: new Date()
                }])
                .select()
                .single();

            if (profileError) throw profileError;

            return { success: true, user: profile };
        } catch (error) {
            console.error('Create user error:', error);
            return { error: 'Failed to create user' };
        }
    }
}

module.exports = new AuthService(); 
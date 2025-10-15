'use client';

import React, { useState } from 'react';
import { Button } from "@/components/UI/Button";



export default function RegisterForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setIsLoading(true);
    setError('');
    
    // In a real app, you'd call your registration API endpoint here
    console.log('Registering user:', { name, email });
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsLoading(false);
    alert('Registration successful! Please login.');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <div>
        <label htmlFor="name-reg" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
        <input id="name-reg" type="text" value={name} onChange={(e) => setName(e.target.value)} className="input-field" required />
      </div>
      <div>
        <label htmlFor="email-reg" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input id="email-reg" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="input-field" required />
      </div>
      <div>
        <label htmlFor="password-reg" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
        <input id="password-reg" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="input-field" required />
      </div>
      <div>
        <label htmlFor="confirmPassword-reg" className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
        <input id="confirmPassword-reg" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="input-field" required />
      </div>
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? 'Creating Account...' : 'Create Account'}
      </Button>
    </form>
  );
}
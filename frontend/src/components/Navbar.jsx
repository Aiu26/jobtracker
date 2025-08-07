'use client';

import React, { useState } from 'react';
import { Group, Container, Button, Text, Image } from '@mantine/core';
import Link from 'next/link';
import CreateJobModal from './CreateJobModal';

const Navbar = () => {
  const [buttonText, setButtonText] = useState('Create Jobs');
  const [modalOpened, setModalOpened] = useState(false);
  
  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Find Jobs', href: '/jobs' },
    { label: 'Find Talents', href: '/talents' },
    { label: 'About us', href: '/about' },
    { label: 'Testimonials', href: '/testimonials' },
  ];

  return (
    <div>
      <Container 
        size="sm" 
        style={{ 
          padding: '1rem 0',
          marginBottom: '2rem'
        }}
      >
        <Group 
          justify="space-between" 
          align="center"
          style={{
            backgroundColor: 'white',
            borderRadius: '50px',
            padding: '1rem 2rem',
            border: '2px solid #e0e0e0',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          }}
        >
          {/* Logo */}
          <Group gap="sm">
            <Image
              src="/logo.png"
              alt="JobTracker Logo"
              width={40}
              height={40}
              style={{ objectFit: 'contain' }}
            />
          </Group>

          {/* Navigation Links */}
          <Group gap="xl" style={{ flex: 1, justifyContent: 'center' }}>
            {navLinks.map((link) => (
              <Link 
                key={link.label} 
                href={link.href}
                style={{ textDecoration: 'none' }}
              >
                <Text
                  size="sm"
                  fw={500}
                  c="dark.6"
                  style={{
                    cursor: 'pointer',
                    transition: 'color 0.2s ease',
                    '&:hover': {
                      color: '#6c5ce7',
                    },
                  }}
                >
                  {link.label}
                </Text>
              </Link>
            ))}
          </Group>

          {/* Create Jobs Button */}
          <Button
            variant="filled"
            color="violet"
            size="sm"
            radius="xl"
            style={{
              backgroundColor: '#6c5ce7',
              border: 'none',
              padding: '0.5rem 1.5rem',
              fontWeight: 500,
              boxShadow: '0 2px 4px rgba(108, 92, 231, 0.3)',
              transition: 'all 0.2s ease',
              minWidth: '120px',
            }}
            onClick={() => setModalOpened(true)}
          >
            Create Jobs
          </Button>
        </Group>
      </Container>
      
      {/* Create Job Modal */}
      <CreateJobModal 
        opened={modalOpened} 
        onClose={() => setModalOpened(false)} 
      />
    </div>
  );
};

export default Navbar; 
package com.project.crud.services;

import java.util.ArrayList;
import java.util.Optional;

import com.project.crud.models.User;
import com.project.crud.repositories.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class JwtUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository usuarioRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        Optional<User> user = usuarioRepository.findByUsernameAndDeletedFalse(username);
        if (user.isPresent()) {
            return new org.springframework.security.core.userdetails.User(user.get().getUsername(),
                    user.get().getPassword(), new ArrayList<>());
        } else {
            throw new UsernameNotFoundException("Username not found: " + username);
        }
    }
}
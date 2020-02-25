package com.project.crud.configuration;

import java.util.Optional;

import com.project.crud.dtos.UserDTO;
import com.project.crud.models.User;
import com.project.crud.repositories.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.AuditorAware;
import org.springframework.data.mongodb.config.EnableMongoAuditing;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import org.springframework.stereotype.Component;

@Component
@EnableMongoAuditing
public class SpringSecurityAuditorAware implements AuditorAware<UserDTO> {

    @Autowired
    private UserRepository userRepository;

    @Override
    public Optional<UserDTO> getCurrentAuditor() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        Optional<User> user = userRepository.findByUsernameAndDeletedFalse(username);
        if (user.isPresent()) {
            return Optional.of(new UserDTO(user.get().getId()));
        }
        return Optional.of(new UserDTO("000000000000000000000000"));
    }
}

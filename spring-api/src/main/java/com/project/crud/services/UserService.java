package com.project.crud.services;

import java.util.List;
import java.util.Optional;

import com.project.crud.handlers.exception.NotFoundException;
import com.project.crud.models.User;
import com.project.crud.repositories.UserRepository;
import com.querydsl.core.types.Predicate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public Page<User> findByPage(Predicate predicate, Pageable pageable) {
        return userRepository.findAll(predicate, pageable);
    }

    public List<User> findAll() {
        return userRepository.findAllByDeletedFalse();
    }

    public User findById(String id) throws Exception {
        Optional<User> user = userRepository.findByIdAndDeletedFalse(id);
        if (user.isPresent()) {
            return user.get();
        }
        throw new NotFoundException();
    }

    public Boolean usernameExists(String username) {
        return userRepository.existsByUsernameAndDeletedFalse(username);
    }

    public User save(User user) throws Exception {
        if (userRepository.existsByUsernameAndDeletedFalse(user.getUsername())) {
            throw new Exception("Username is already registered in the system.");
        }
        String encodedPassword = new BCryptPasswordEncoder().encode(user.getPassword());
        user.setPassword(encodedPassword);
        return userRepository.save(user);
    }

    public User update(User user) throws Exception {
        User userDB = findById(user.getId());
        userDB.setName(user.getName());
        userDB.setEmail(user.getEmail());
        userDB.setUsername(user.getUsername());
        userDB.setLanguage(user.getLanguage());
        userDB.setDepartment(user.getDepartment());
        userDB.setGroups(user.getGroups());
        userDB.setAdministrator(user.getAdministrator());
        if (user.getPassword() != null) {
            String encodedPassword = new BCryptPasswordEncoder().encode(user.getPassword());
            userDB.setPassword(encodedPassword);
        }

        return userRepository.save(userDB);
    }

    public void delete(String id) throws Exception {
        User user = findById(id);
        user.setDeleted(true);
        userRepository.save(user);
    }
}
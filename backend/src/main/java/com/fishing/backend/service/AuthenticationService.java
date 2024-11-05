package com.fishing.backend.service;

import com.fishing.backend.payload.LoginDto;
import com.fishing.backend.payload.SignUpDto;
import com.fishing.backend.model.User;
import com.fishing.backend.repository.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationService {
    private final UserRepository userRepository;
    
    private final PasswordEncoder passwordEncoder;
    
    private final AuthenticationManager authenticationManager;

    public AuthenticationService(
        UserRepository userRepository,
        AuthenticationManager authenticationManager,
        PasswordEncoder passwordEncoder
    ) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User signup(SignUpDto input) {
        User user = new User(input.getUsername(), input.getEmail(), passwordEncoder.encode(input.getPassword()), input.getInventoryString(), input.getWallet(), input.getRecordsString());

        return userRepository.save(user);
    }

    public User authenticate(LoginDto input) {
      System.out.println("authenticating");
      User user = userRepository.findByUsernameOrEmail(input.getUsername(), input.getUsername()).orElseThrow(() -> new BadCredentialsException("Username/Email does not exist"));
      authenticationManager.authenticate(
              new UsernamePasswordAuthenticationToken(
                      user.getUsername(),
                      input.getPassword()
              )
      );

      return userRepository.findByUsernameOrEmail(input.getUsername(), input.getUsername())
              .orElseThrow();
    }
}
package com.fishing.backend.controller;

import com.fishing.backend.model.User;
import com.fishing.backend.payload.LoginDto;
import com.fishing.backend.payload.SignUpDto;
import com.fishing.backend.repository.UserRepository;
import com.fishing.backend.response.LoginResponse;
import com.fishing.backend.response.UserResponse;
import com.fishing.backend.service.AuthenticationService;
import com.fishing.backend.service.JwtService;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "https://ja9q.github.io/", allowCredentials = "true")
@RestController
@RequestMapping("/api")
public class AuthController {

    private final UserRepository userRepository;
  
    private final JwtService jwtService;
    
    private final AuthenticationService authenticationService;
    
    public AuthController(UserRepository userRepository, JwtService jwtService, AuthenticationService authenticationService) {
      this.userRepository = userRepository;
      this.jwtService = jwtService;
      this.authenticationService = authenticationService;
    }

    @PostMapping("/auth/login")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginDto loginDto, HttpServletResponse response){
      
    	System.out.println("log in attempt");
      try {
        User authenticatedUser = authenticationService.authenticate(loginDto);
        
        String jwtToken = jwtService.generateToken(authenticatedUser);

        Cookie jwt = new Cookie("jwt", jwtToken);
        jwt.setHttpOnly(true);
        jwt.setMaxAge(7 * 24 * 60 * 60);
        jwt.setSecure(false);
        jwt.setPath("/");
        
        response.addCookie(jwt);
        
        System.out.println("added cookie: " + jwt.getValue());
        return ResponseEntity.ok()
        		  .header("Cache-Control", "no-cache, no-store, max-age=0, must-revalidate")
        		  .body(authenticatedUser);
      } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
        		  .header("Cache-Control", "no-cache, no-store, max-age=0, must-revalidate")
        		  .body("Invalid email/username or password");
      }
      
    }

    @PostMapping("/auth/signup")
    public ResponseEntity<?> registerUser(@RequestBody SignUpDto signUpDto){

        System.out.println("sign up attempt");
        // add check for username exists in a DB
        if(userRepository.existsByUsername(signUpDto.getUsername())){
        	return ResponseEntity.status(HttpStatus.BAD_REQUEST)
          		  .header("Cache-Control", "no-cache, no-store, max-age=0, must-revalidate")
          		  .body("Username is already taken!");
        }

        // add check for email exists in DB
        if(userRepository.existsByEmail(signUpDto.getEmail())){
        	return ResponseEntity.status(HttpStatus.BAD_REQUEST)
            		  .header("Cache-Control", "no-cache, no-store, max-age=0, must-revalidate")
            		  .body("Email is already taken!");
            
        }

        User registeredUser = authenticationService.signup(signUpDto);
        return ResponseEntity.ok()
        		  .header("Cache-Control", "no-cache, no-store, max-age=0, must-revalidate")
        		  .body(registeredUser);
    }
    
    @PostMapping("/auth/logout")
    public ResponseEntity<?> logoutUser(HttpServletResponse response){

        System.out.println("log out attempt");

        // delete the jwt
        
        Cookie jwt = new Cookie("jwt", null);
        jwt.setHttpOnly(true);
        jwt.setMaxAge(0);
        jwt.setSecure(false);
        jwt.setPath("/");
        
        response.addCookie(jwt);

        return new ResponseEntity<>(HttpStatus.OK);
    }
    
    
    
}
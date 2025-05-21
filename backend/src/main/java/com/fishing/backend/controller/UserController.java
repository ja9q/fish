package com.fishing.backend.controller;

import com.fishing.backend.model.User;
import com.fishing.backend.payload.LoginDto;
import com.fishing.backend.payload.SignUpDto;
import com.fishing.backend.payload.UserSaveDto;
import com.fishing.backend.repository.UserRepository;
import com.fishing.backend.response.LoginResponse;
import com.fishing.backend.response.UserResponse;
import com.fishing.backend.service.AuthenticationService;
import com.fishing.backend.service.JwtService;

import jakarta.servlet.ServletRequest;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;

import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "https://ja9q.github.io/", allowCredentials = "true")
@RestController
@RequestMapping("/api/user")
public class UserController {

    private final UserRepository userRepository;
    
    private final AuthenticationService authenticationService;
    
    public UserController(UserRepository userRepository, JwtService jwtService, AuthenticationService authenticationService) {
      this.userRepository = userRepository;
      this.authenticationService = authenticationService;
    }
    
    @GetMapping("/me")
    public ResponseEntity<?> authenticatedUser(HttpServletRequest request) {
      
      
      
      Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
      
      User currentUser = (User) authentication.getPrincipal();
      
      UserResponse userData = new UserResponse(currentUser);
      
      
      return new ResponseEntity<>(userData, HttpStatus.OK).header("Cache-Control", "no-cache, no-store, max-age=0, must-revalidate");
    }
    
    @PatchMapping("/save")
    public ResponseEntity<?> saveUser(@RequestBody UserSaveDto saveDto, HttpServletRequest request) {
    	System.out.println("save attempt");
    	try {
    		Optional<User> checkUser =  userRepository.findByUsername(saveDto.getUsername());
        	
        	
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            
            User currentUser = (User) authentication.getPrincipal();
            
            if (checkUser.isPresent()) {
            	User saveUser = checkUser.get();
            	if(saveUser.getUsername().equalsIgnoreCase(currentUser.getUsername())) {
            		System.out.println("user matches session");
            		saveUser.setInventory(saveDto.getInventoryString());
            		saveUser.setWallet(saveDto.getWallet());
            		saveUser.setRecord(saveDto.getRecordsString());
            		return new ResponseEntity<>(userRepository.save(saveUser), HttpStatus.OK).header("Cache-Control", "no-cache, no-store, max-age=0, must-revalidate");
            	} else {
            		return new ResponseEntity<>("Username does not match session username", HttpStatus.BAD_REQUEST).header("Cache-Control", "no-cache, no-store, max-age=0, must-revalidate");
            	}
            } else {
            	return new ResponseEntity<>("User could not be found", HttpStatus.BAD_REQUEST).header("Cache-Control", "no-cache, no-store, max-age=0, must-revalidate");
            }
            
            
    	} catch (Exception e) {
    		return new ResponseEntity<>("Could not save", HttpStatus.BAD_REQUEST).header("Cache-Control", "no-cache, no-store, max-age=0, must-revalidate");
    	}
        
      }

     
}
package com.fishing.backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fishing.backend.model.User;


public interface UserRepository extends JpaRepository<User, Long> {
  
  List<User> findByRole(String Role);
  Optional<User> findByUsername(String username);
  Optional<User> findByEmail(String email);
  Optional<User> findByUsernameOrEmail(String usernameOrEmail, String usernameOrEmail1);
  Boolean existsByUsername(String username);
  Boolean existsByEmail(String email);
}
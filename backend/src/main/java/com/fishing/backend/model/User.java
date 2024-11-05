package com.fishing.backend.model;

import lombok.Data;

import java.time.Instant;
import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.*; // for Spring Boot 3

@Data
@Entity
@Table(name = "users")
public class User implements UserDetails {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;
	
	@Column(name = "username")
  private String username;

  @Column(name = "email")
  private String email;

  @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
  @Column(name = "password")
  private String password;

  @Column(name = "date_created")
  private String dateCreated;
  
  @Column(name = "inventory")
  private String inventory;
  
  @Column(name = "wallet")
  private double wallet;
  
  @Column(name = "record")
  private String record;
  
  @Column(name = "role")
  private String role;
	
	public User() {
	  
	}
	
	public User(String username, String email, String password, String inventory, double wallet, String record) {
	  this.username = username;
	  this.email = email;
	  this.password = password;
	  this.dateCreated = Instant.now().toString();
	  this.role = "USER";
	  this.inventory = inventory;
	  this.wallet = wallet;
	  this.record = record;
	  
	}
	
	@Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    return List.of();
  }
  
  @Override
  public boolean isAccountNonExpired() {
    return true;
  }
  
  @Override
  public boolean isAccountNonLocked() {
    return true;
  }
  
  @Override
  public boolean isCredentialsNonExpired() {
    return true;
  }
  
  @Override
  public boolean isEnabled() {
    return true;
  }
	
}
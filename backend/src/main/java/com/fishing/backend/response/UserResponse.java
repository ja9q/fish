package com.fishing.backend.response;

import lombok.Data;

import com.fishing.backend.model.User;

@Data
public class UserResponse {
  private String username;
  private String dateCreated;
  private String role;
  private String inventory;
  private double wallet;
  private String record;
  
  public UserResponse() {
    
  }
  
  public UserResponse(User user) {
    this.username = user.getUsername();
    this.dateCreated = user.getDateCreated();
    this.role = user.getRole();
    this.inventory = user.getInventory();
    this.wallet = user.getWallet() ;   
    this.record = user.getRecord();
  }
  
  public UserResponse(String username, String date_created, String role, String inventory, double wallet, String record) {
    this.username = username;
    this.dateCreated = date_created;
    this.role = role;
    this.inventory = inventory;
    this.wallet = wallet;
    this.record = record;
  }

  
  
}
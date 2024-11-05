package com.fishing.backend.response;

public class LoginResponse {
  private String token;
  private String username;
  private long expiresIn;
  
  public LoginResponse() {
    
  }
  
  public LoginResponse(String token, String username, long expiresIn) {
    this.token = token;
    this.username = username;
    this.expiresIn = expiresIn;
  }
  
  public String getToken() {
    return token;
  }
  
  public String getUsername() {
    return username;
  }
  
  public void setToken(String token) {
    this.token = token;
  }
  
  public long getExpiresIn() {
    return expiresIn;
  }
  
  public void setExpiresIn(long expiresIn) {
    this.expiresIn = expiresIn;
  }
}
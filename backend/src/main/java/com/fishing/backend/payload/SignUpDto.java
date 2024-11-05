package com.fishing.backend.payload;

import lombok.Getter;

public class SignUpDto {
	@Getter
    private String username;
	@Getter
    private String email;
	@Getter
    private String password;
	@Getter
    private String inventoryString;
	@Getter
    private double wallet;
	@Getter
    private String recordsString;
    
    
    
}
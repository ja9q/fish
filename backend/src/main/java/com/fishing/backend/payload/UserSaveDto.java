package com.fishing.backend.payload;

import lombok.Getter;

public class UserSaveDto {
	@Getter
    private String username;
	@Getter
    private String inventoryString;
	@Getter
    private double wallet;
	@Getter
    private String recordsString;
    
}
package com.v.accounts.dto;

import java.time.LocalDateTime;

import org.springframework.http.HttpStatus;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ErrorDto {

	private String apiPath;
	private HttpStatus errorCode;

	private String ErrorMessage;

	private LocalDateTime errorTime;
}

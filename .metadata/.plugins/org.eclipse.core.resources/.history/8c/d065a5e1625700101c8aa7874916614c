package com.v.gatewayserver.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.v.gatewayserver.security.JwtTokenGeneratorService;

@RestController
@RequestMapping("/test-jwt")
public class JwtTestController {

    private final JwtTokenGeneratorService jwtService;

    public JwtTestController(JwtTokenGeneratorService jwtService) {
        this.jwtService = jwtService;
    }

    @GetMapping
    public ResponseEntity<String> getJwt() {
        String jwt = jwtService.generateSignedJwt();
        return ResponseEntity.ok(jwt);
    }
}

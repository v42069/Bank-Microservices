package com.v.accounts.service.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.v.accounts.dto.LoansDto;
import com.v.accounts.responsestructure.ResponseStructure;


@FeignClient(name="loans",url = "http://loans:8090",fallback = LoansFallBack.class)
public interface LoansFeignClient {
	
	@GetMapping(value="/api/fetch", consumes = "json")
	public ResponseStructure<LoansDto> fetchLoan(@RequestParam String mobileNumber);


}

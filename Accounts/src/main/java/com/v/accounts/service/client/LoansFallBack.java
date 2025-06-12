package com.v.accounts.service.client;

import org.springframework.stereotype.Component;

import com.v.accounts.dto.LoansDto;
import com.v.accounts.responsestructure.ResponseStructure;

@Component
public class LoansFallBack implements LoansFeignClient{

	@Override
	public ResponseStructure<LoansDto> fetchLoan(String mobileNumber) {
		// TODO Auto-generated method stub
		return null;
	}

}

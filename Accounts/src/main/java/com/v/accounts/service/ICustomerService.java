package com.v.accounts.service;

import com.v.accounts.dto.CustomerDetailsDto;
import com.v.accounts.responsestructure.ResponseStructure;

public interface ICustomerService {
	
	/*
	 * @param mobile
	 * @return customer details based on mobile
	 */
	ResponseStructure<CustomerDetailsDto> fetchCustomerDetails(String mobileNumber);

}

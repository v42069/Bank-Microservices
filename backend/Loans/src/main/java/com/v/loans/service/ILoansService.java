package com.v.loans.service;

import com.v.loans.dto.LoansDto;
import com.v.loans.responsestructure.ResponseStructure;

public interface ILoansService {

    /**
     *
     * @param mobileNumber - Mobile Number of the Customer
     */
    ResponseStructure<?> createLoan(String mobileNumber);

    /**
     *
     * @param mobileNumber - Input mobile Number
     *  @return Loan Details based on a given mobileNumber
     */
    ResponseStructure<?> fetchLoan(String mobileNumber);

    /**
     *
     * @param loansDto - LoansDto Object
     * @return boolean indicating if the update of card details is successful or not
     */
    ResponseStructure<?> updateLoan(LoansDto loansDto);

    /**
     *
     * @param mobileNumber - Input Mobile Number
     * @return boolean indicating if the delete of loan details is successful or not
     */
    ResponseStructure<?> deleteLoan(String mobileNumber);

}
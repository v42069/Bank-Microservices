package com.v.accounts.service.client;

import org.slf4j.MDC;
import org.springframework.stereotype.Component;

import feign.RequestInterceptor;
import feign.RequestTemplate;

@Component
public class FeignCorrelationInterceptor implements RequestInterceptor{
	
	public static final String CORRELATION_ID = "v-correlation-id";

	@Override
	public void apply(RequestTemplate template) {
		// TODO Auto-generated method stub
		String correlationId = MDC.get(CORRELATION_ID);
        if (correlationId != null) {
            template.header(CORRELATION_ID, correlationId);
        }
		
	}

}

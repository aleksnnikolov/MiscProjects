package com.luv2code.springdemo.aspect;

import java.util.logging.Logger;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class CRMLoggingAspect {

	private Logger logger = Logger.getLogger(getClass().getName());
	
	@Pointcut("execution(* com.luv2code.springdemo.controller.*.*(..))")
	private void forControllerPackage() {}
	
	@Pointcut("execution(* com.luv2code.springdemo.service.*.*(..))")
	private void forServicePackage() {}
	
	@Pointcut("execution(* com.luv2code.springdemo.dao.*.*(..))")
	private void forDaoPackage() {}
	
	@Pointcut("forControllerPackage() || forServicePackage() || forDaoPackage()")
	private void forAppFlow() {}
	
	
	
	@Before("forAppFlow()")
	public void before(JoinPoint joinPoint) {
		
		// display method being called
		String method = joinPoint.getSignature().toString();
		logger.info("===> in @Before: calling method: " + method);
		
		// get the methods arguments
		Object[] args = joinPoint.getArgs();
		
		// loop through the args and display them
		for (Object arg: args) {
			logger.info("===> argument: " + arg);
		}
		
	}
	
	
	@AfterReturning(pointcut="forAppFlow()", returning="result")
	public void afterReturning(JoinPoint joinPoint, Object result) {
		
		// display method we are returing from
		String method = joinPoint.getSignature().toString();
		logger.info("===> in @AfterReturning: from method: " + method);
		
		// display data returned
		logger.info("===> result: " + result);
		
	}
	
	
	
}

package com.formapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.formapp.service.UserService;
import com.formapp.vo.UserVO;

@RestController
@RequestMapping("/user")
public class UserController {
	
	@Autowired
	UserService userService;
	
	@RequestMapping(value="/login", method=RequestMethod.POST)
	public UserVO login(@RequestBody UserVO user) {		
		return userService.login(user);
	}
	
	@PostMapping("/signup")
	public boolean signup(@RequestBody UserVO user) {
		return userService.signup(user);
	}
}

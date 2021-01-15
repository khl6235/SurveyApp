package com.formapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.formapp.mapper.UserMapper;
import com.formapp.vo.UserVO;

@RestController
@RequestMapping("/user")
public class UserController {

	@Autowired
	UserMapper userMapper;
	
	@RequestMapping(value="/login", method=RequestMethod.POST)
	public UserVO login(@RequestBody UserVO user) {		
		UserVO matchUser = userMapper.login(user);
		if(matchUser == null) {
			return null;
		}
		else {
			return matchUser;
		}
	}
}

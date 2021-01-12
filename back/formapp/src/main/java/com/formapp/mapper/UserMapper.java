package com.formapp.mapper;

import org.apache.ibatis.annotations.Mapper;

import com.formapp.vo.UserVO;

@Mapper
public interface UserMapper {
	
	UserVO login(UserVO vo);
}

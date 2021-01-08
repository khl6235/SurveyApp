package com.formapp.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.formapp.vo.FormVO;

@Mapper
public interface FormMapper {
	
	List<FormVO> formList();

}

package com.formapp.mapper;

import org.apache.ibatis.annotations.Mapper;

import com.formapp.model.ReplyInfo;
import com.formapp.vo.ContentVO;
import com.formapp.vo.EntryVO;

@Mapper
public interface ContentMapper {
	void replySubj(ReplyInfo replyInfo);
	void replyObj(ReplyInfo replyInfo);
}

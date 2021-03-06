package com.formapp.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.formapp.model.ReplyInfo;
import com.formapp.vo.ContentVO;
import com.formapp.vo.EntryVO;
import com.formapp.vo.FormVO;
import com.formapp.vo.ObjResultVO;
import com.formapp.vo.SubjResultVO;

@Mapper
public interface FormMapper {
	List<FormVO> formList();
	FormVO formDetail(int formIdx);
	List<ContentVO> contentList(int formIdx);
	List<EntryVO> objEntryList(int contentIdx);
	List<ObjResultVO> objResult(int contentIdx);
	List<SubjResultVO> subjResult(int contentIdx);
	void replySubj(ReplyInfo replyInfo);
	void replyObj(ReplyInfo replyInfo);
	void formCreate(FormVO formVO);
	int findUser(String id);
	void formUserCreate(int userIdx, int formIdx);
	void contentCreate(ContentVO contentVO);
	void entryCreate(EntryVO entryVO);
	void deleteUserForm(int formIdx);
	void deleteForm(int formIdx);
}

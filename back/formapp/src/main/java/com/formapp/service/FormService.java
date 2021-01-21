package com.formapp.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.formapp.mapper.FormMapper;
import com.formapp.model.ContentCreateInfo;
import com.formapp.model.ContentInfo;
import com.formapp.model.CreateForm;
import com.formapp.model.ObjEntry;
import com.formapp.model.ReplyInfo;
import com.formapp.model.ResultForm;
import com.formapp.vo.ContentVO;
import com.formapp.vo.EntryVO;
import com.formapp.vo.FormVO;

@Service
public class FormService {
	
	@Autowired
	FormMapper formMapper;
	
	public List<FormVO> formList(){
		return formMapper.formList();
	}
	
	public ResultForm formDetail(int formIdx) {
		ResultForm resultForm = new ResultForm();
		
		//formInfo
		resultForm.formInfo = formMapper.formDetail(formIdx);
		
		//contentInfo
		List<ContentVO> contentList = formMapper.contentList(formIdx);
		List<ContentInfo> contentInfoList = new ArrayList<>();
		if(!contentList.isEmpty()) {
			for(int con = 0; con < contentList.size(); con++) {
				ContentInfo contentInfo = new ContentInfo();
				
				//contentDetail
				contentInfo.contentDetail = contentList.get(con);
				
				int contentIdx = contentList.get(con).getContentIdx();
				
				//entryDetail
				List<EntryVO> entryDetail = formMapper.objEntryList(contentIdx);
				if(entryDetail.size() != 0) { //obj
					contentInfo.entryDetail = entryDetail;
					contentInfo.objResultDetail = formMapper.objResult(contentIdx);
					contentInfo.subjResultDetail = null;
				}
				else { //subj
					contentInfo.entryDetail = null;
					contentInfo.objResultDetail = null;
					contentInfo.subjResultDetail = formMapper.subjResult(contentIdx);
				}
				contentInfoList.add(contentInfo);
			}
		}
		resultForm.contentInfo = contentInfoList;
		
		return resultForm;
	}
	
	public void formReply(int formIdx, List<ReplyInfo> replyInfo) {
		for(int reply = 0; reply < replyInfo.size(); reply++) {
			if(replyInfo.get(reply).objReply != -1 && replyInfo.get(reply) instanceof ReplyInfo) {
				if(replyInfo.get(reply).objReply == 0) { //subj
					formMapper.replySubj(replyInfo.get(reply));
				}
				else { //obj
					formMapper.replyObj(replyInfo.get(reply));
				}
			}
		}
	}
	
	public void formCreate(CreateForm createForm) {
		FormVO formVO = new FormVO();
		formVO.setUserId(createForm.userId);
		formVO.setTitle(createForm.title);
		
		//insert form table & find formIdx
		formMapper.formCreate(formVO);
		int formIdx = formVO.getFormIdx();
		
		//find userIdx
		int userIdx = formMapper.findUser(createForm.userId);
		
		//insert user_form table
		formMapper.formUserCreate(userIdx, formIdx);
		
		for(int cont = 0; cont < createForm.contents.size(); cont++) {
			String contentType = createForm.contents.get(cont).contentType;
			if(contentType.equals("obj") || contentType.equals("subj")) {
				ContentCreateInfo contentInfo = createForm.contents.get(cont).contentInfo;
				ContentVO contentVO = new ContentVO();
				contentVO.setFormIdx(formIdx);
				contentVO.setQuestion(contentInfo.question);
				contentVO.setDescription(contentInfo.description);
				
				//insert content table & find contentIdx
				formMapper.contentCreate(contentVO);
				int contentIdx = contentVO.getContentIdx();
				
				//if obj, iteration
				if(contentType.equals("obj") && contentInfo.objEntry != null) {
					 ObjEntry objEntry = contentInfo.objEntry;
					 for(int ent = 0; ent < objEntry.entries.size(); ent++) {
						 EntryVO entryVO = new EntryVO();
						 entryVO.setContentIdx(contentIdx);
						 entryVO.setEntry(objEntry.entries.get(ent).entry);
						 
						 //insert obj_entry table
						 formMapper.entryCreate(entryVO);
					 }
				}
			}
			
		}
	}
	
	public void deleteForm(int formIdx) {
		formMapper.deleteUserForm(formIdx);
		formMapper.deleteForm(formIdx);
	}
}

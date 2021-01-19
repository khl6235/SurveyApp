package com.formapp.vo;

public class EntryVO {
	
	int entryIdx;
	int contentIdx;
	String entry;
	
	public int getEntryIdx() {
		return entryIdx;
	}
	public void setEntryIdx(int entryIdx) {
		this.entryIdx = entryIdx;
	}
	public int getContentIdx() {
		return contentIdx;
	}
	public void setContentIdx(int contentIdx) {
		this.contentIdx = contentIdx;
	}
	public String getEntry() {
		return entry;
	}
	public void setEntry(String entry) {
		this.entry = entry;
	}
	
	@Override
	public String toString() {
		return "EntryVO [entryIdx = "+entryIdx+", contentIdx = "+contentIdx+", entry = "+entry+"]";
	}

}

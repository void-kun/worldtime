package com.zrik.wtbs.services;

import com.zrik.wtbs.dto.ReqTimeZone;
import com.zrik.wtbs.dto.ResponseTemplate;


public interface TimezoneService {
    ResponseTemplate findTimeZoneByPlaceOrTimezoneOrOffset(ReqTimeZone reqTimeZone);
}

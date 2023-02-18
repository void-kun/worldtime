package com.zrik.wtbs.controllers;

import com.zrik.wtbs.dto.ReqTimeZone;
import com.zrik.wtbs.dto.ResponseTemplate;
import com.zrik.wtbs.services.impl.TimeZServiceImpl;
import com.zrik.wtbs.utils.Constant;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping(path = Constant.PathTZ)
public class TimeZController {
    private Logger logger = LoggerFactory.getLogger(TimeZController.class);

    @Autowired
    private TimeZServiceImpl timezService;

    @GetMapping()
    @ResponseBody
    public ResponseEntity<ResponseTemplate> getTimezoneByCondition(@RequestBody ReqTimeZone reqTimeZone) {
        return timezService.findTimeZoneByPlaceOrTimezoneOrOffset(reqTimeZone);
    }
}

package com.hystrix.exceldemo.exception;


import com.hystrix.exceldemo.common.BaseResponse;
import com.hystrix.exceldemo.common.ErrorCode;
import com.hystrix.exceldemo.common.ResultUtils;
import com.hystrix.exceldemo.exception.ex.BusinessException;
import lombok.extern.slf4j.Slf4j;

import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.nio.file.AccessDeniedException;

/**
 * 全局异常处理器
 *
 * @author yupi
 */
@RestControllerAdvice
@Slf4j
public class GlobalExceptionHandler {

    //继续抛出给AliAccessDeniedHandler处理
    @ExceptionHandler(AccessDenied.class)
    public void defaultExceptionHandler(AccessDeniedException e) throws AccessDenied{
        throw e;
    }

    //继续抛出给AliAccessDeniedHandler处理
    @ExceptionHandler(AccessDeniedException.class)
    public void defaultExceptionHandler22(AccessDeniedException e) throws AccessDenied{
        throw e;
    }

    @ExceptionHandler(RuntimeException.class)
    public BaseResponse<?> runtimeExceptionHandler(RuntimeException e) {
        return ResultUtils.error(ErrorCode.SYSTEM_ERROR, e.getMessage());
    }
    print(3);
}

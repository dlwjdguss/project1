package com.ex.back.service.implement;

import java.io.File;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.ex.back.service.FileService;

@Service
public class FileServiceImplement implements FileService {

    // application.properties에서 읽어오는 경로
    @Value("${file.path}")
    private String filePath;

    @Value("${file.url}")
    private String fileUrl;

    @Override
    public String upload(MultipartFile file) {
        if (file.isEmpty()) return null;

        try {
            // 원본 파일 이름과 확장자
            String originalFileName = file.getOriginalFilename();
            String extension = originalFileName.substring(originalFileName.lastIndexOf("."));

            // 랜덤 UUID로 파일 이름 생성
            String uuid = UUID.randomUUID().toString();
            String saveFileName = uuid + extension;

            // 실제 저장 경로
            Path savePath = Paths.get(filePath, saveFileName);

            // 폴더가 없으면 생성
            File dir = new File(filePath);
            if (!dir.exists()) {
                boolean created = dir.mkdirs();
                if (!created) {
                    System.out.println("폴더 생성 실패: " + filePath);
                    return null;
                } else {
                    System.out.println("폴더 생성 성공: " + filePath);
                }
            }

            // 파일 저장
            file.transferTo(savePath.toFile());

            // 접근 가능한 URL 반환
            return fileUrl + saveFileName;

        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public Resource getImage(String fileName) {
        try {
            Path file = Paths.get(filePath, fileName);
            return new UrlResource(file.toUri());
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}

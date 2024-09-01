<template>
    <div>
        <n-card title="OCR Image Text Extraction">
            <n-space vertical>
                <n-upload
                    :multiple="false"
                    :before-upload="handleFileChange"
                    accept=".jpg, .jpeg, .png, .bmp"
                    label="Upload Image"
                    label-placement="left"
                    label-width="120"
                >
                    <template #trigger>
                        <n-button type="primary">Choose File</n-button>
                    </template>
                </n-upload>

                <n-form-item label="Extracted Text: " label-placement="left" label-width="120">
                    <n-input v-model:value="extractedText" disabled type="textarea" :autosize="{ minRows: 5, maxRows: 10 }" />
                </n-form-item>

                <div class="mt-5 flex justify-center">
                    <n-button @click="copyToClipboard(extractedText)">
                        Copy Text
                    </n-button>
                </div>
            </n-space>
        </n-card>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Tesseract from 'tesseract.js';
import { NCard, NButton, NUpload, NSpace, NFormItem, NInput } from 'naive-ui';

// 定义上传文件的处理逻辑
const handleFileChange = (file: File) => {
    if (file) {
        processImage(file);
    }
    return false; // 阻止默认上传行为
};

// 定义从图像中提取文本的函数
const processImage = async (file: File) => {
    try {
        const result = await Tesseract.recognize(
            file,
            'eng', // 语言设置
            { logger: m => console.log(m) }
        );

        extractedText.value = result.text;
    } catch (error) {
        console.error('Error during OCR processing:', error);
    }
};

// 定义提取的文本
const extractedText = ref('');

// 复制到剪贴板功能
const copyToClipboard = (value: string) => {
    navigator.clipboard.writeText(value)
        .then(() => {
            console.log('Text copied to clipboard');
        })
        .catch(err => {
            console.error('Failed to copy text: ', err);
        });
};

// 初始化组件
onMounted(() => {
    // 如果需要初始化操作，可以在这里执行
});
</script>

<style scoped>
.n-card {
    margin-top: 20px;
}

.n-input {
    width: 100%;
}
</style>
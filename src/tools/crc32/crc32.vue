<script setup lang="ts">
import { computed, ref } from 'vue';
import { useClipboard } from '@vueuse/core';
import { crc32 } from 'js-crc';

// 定义输入字符串
const input = ref('');

const crcDecimal = computed(
  () => {
    const hexValue = crc32(input.value);
    return BigInt(`0x${hexValue}`).toString();
  });
const crcHex = computed(() => crc32(input.value).toString(16).toUpperCase());
const crcBinary = computed(
  () => {
    const hexValue = crc32(input.value);
    return BigInt(`0x${hexValue}`).toString(2);
  });
const crcOctal = computed(
  () => {
    const hexValue = crc32(input.value);
    return BigInt(`0x${hexValue}`).toString(8);
  });

// 复制到剪贴板功能
const { copy, isSupported } = useClipboard();

// 复制函数
function copyToClipboard(value: string) {
  if (isSupported) { copy(value); }
}
</script>

<template>
  <c-card title="CRC-32 Calculator">
    <c-input-text
      v-model:value="input"
      placeholder="Your string to calculate CRC-32..."
      raw-text
      label="Your string: "
      label-position="left"
      label-align="right"
      label-width="120px"
      mb-2
    />
    <n-form-item label="CRC-32 Decimal(10): " label-placement="left" label-width="120">
      <c-input-text :value="crcDecimal" readonly text-center />
      <c-button @click="copyToClipboard(crcDecimal)">
        Copy
      </c-button>
    </n-form-item>
    <n-form-item label="CRC-32 Hexadecimal(16): " label-placement="left" label-width="120">
      <c-input-text :value="crcHex" readonly text-center />
      <c-button @click="copyToClipboard(crcHex)">
        Copy
      </c-button>
    </n-form-item>
    <n-form-item label="CRC-32 Binary(2): " label-placement="left" label-width="120">
      <c-input-text :value="crcBinary" readonly text-center />
      <c-button @click="copyToClipboard(crcBinary)">
        Copy
      </c-button>
    </n-form-item>
    <n-form-item label="CRC-32 Octal(8): " label-placement="left" label-width="120">
      <c-input-text :value="crcOctal" readonly text-center />
      <c-button @click="copyToClipboard(crcOctal)">
        Copy
      </c-button>
    </n-form-item>
  </c-card>
</template>

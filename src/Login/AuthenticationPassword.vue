<template>
    <el-form :model="form" ref="passwordForm" :rules="rules">
        <el-form-item label="输入密码">
            <el-input type="password" v-model="form.password" placeholder="密码必须为8位以上，且包含数字、大小字母、特殊字符"
                @input="checkPasswordStrength">
            </el-input>
        </el-form-item>
        <el-form-item>
            <div class="password-strength">
                <div v-for="(block, index) in strengthBlocks" :key="index" class="block" :class="block">
                </div>
                <span class="strength-text">{{ strengthText }}</span>
            </div>
        </el-form-item>
    </el-form>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { ElForm, ElFormItem, ElInput } from 'element-plus';

const form = reactive({
  password: '',
});

const strengthBlocks = ref(['weak', 'weak', 'weak']);
const strengthText = ref('');

const checkPasswordStrength = () => {
  const password = form.password;

  if (typeof password !== 'string') {
    console.error("无效的密码输入，密码需为字符串类型");
    setStrengthBlocks('weak');
    return;
  }

  if (!password) {
    setStrengthBlocks('weak');
    return;
  }

  // 定义密码强度模式
  const patterns = [
    { regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/, strength: 'strong' },
    { regex: /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/, strength: 'medium' }
  ];

  // 根据匹配情况设置密码强度
  const matchedPattern = patterns.find(pattern => pattern.regex.test(password));
  if (matchedPattern) {
    setStrengthBlocks(matchedPattern.strength);
  } else {
    setStrengthBlocks('weak');
  }
};

// 设置密码强度块和文本
const setStrengthBlocks = (strength) => {
  const blockMapping = {
    'strong': ['strong', 'strong', 'strong'],
    'medium': ['medium', 'medium', 'weak'],
    'weak': ['weak', 'weak', 'weak'],
  };
  strengthBlocks.value = blockMapping[strength] || ['weak', 'weak', 'weak'];
  if (strength === 'weak') {
    strengthText.value = '弱';
  } else if (strength === 'medium') {
    strengthText.value = '中等';
  } else {
    strengthText.value = '强';
  }

};

</script>

<style scoped>
.password-strength {
    display: flex;
    align-items: center;
    gap: 5px;
    margin-top: 10px;
}

.block {
    width: 30px;
    height: 10px;
    border-radius: 2px;
    background-color: #e0e0e0;
}

.weak {
    background-color: red;
}

.medium {
    background-color: orange;
}

.strong {
    background-color: green;
}

.strength-text {
    margin-left: 10px;
    font-size: 14px;
    font-weight: bold;
}
</style>

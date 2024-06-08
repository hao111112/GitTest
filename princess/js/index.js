let phoneInput = document.getElementById('phoneText');
let AgreeCheck = document.getElementById('agreeCheck');
const selectRegions = document.querySelectorAll('.selectRegion');
const commitPhoneElement = document.getElementById('commitPhone');

// 手机号输入监听器
phoneInput.addEventListener('input', (event) => {
  if (event.target.value.length > 11) {
    event.target.value = event.target.value.slice(0, 11);
  }
  event.target.value = event.target.value.replace(/\D/g, '');
  console.log(event.target.value);
});

// 下拉框选择事件监听器
selectRegions.forEach((region, index) => {
  region.addEventListener('click', () => {
    const selectedValue = region.getAttribute('value');
    const selectedText = region.textContent.trim();
    selectRegions[0].setAttribute('value', selectedValue);
    selectRegions[0].textContent = selectedText;
    selectRegions.forEach(item => {
      item.classList.remove('hidden');
    });
    selectRegions.forEach(item => {
      item.classList.remove('selected');
    });
    region.classList.add('selected');
  });
});

// 提交按钮点击事件监听器
commitPhoneElement.addEventListener('click', () => {
  // 检查复选框是否被勾选
  
  // 检查手机号格式
  let phoneValue = phoneInput.value;
  if (phoneValue==='') {
    alert('手机号为空!');
    return;
  }

  if (isNaN(phoneValue)) {
    alert('手机号格式不正确!');
    return;
  }

  // 检查下拉框选择情况
  let selectedRegion = selectRegions[0].getAttribute('value');
  if (selectedRegion === 'none') {
    alert('请选择地区!');
    return;
  }

  let isAgreeCheck = AgreeCheck.checked;
  console.log('isAgreeCheck:', isAgreeCheck);
   if(!isAgreeCheck){
    alert('请同意用户隐私条款');
    return;
   }
  // 所有检查通过后,执行提交操作
  console.log('手机号:', phoneValue);
  console.log('地区:', selectedRegion);
  // 在这里添加您的提交逻辑
  fetch('http://127.0.0.1:8084/api/commitPhone', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    'Accept': 'application/json'
    },
    body: JSON.stringify({ region: selectedRegion, phone: phoneValue })
  })
  .then(response => response.json())
  .then(data => {
    console.log('提交成功:', data);
    // 在这里添加其他成功后的逻辑
    // 获取弹窗元素
    var modal = document.querySelector('.modal-container');

    // 获取关闭按钮元素
    var closeButton = document.querySelector('.close-button');
    
    // 显示弹窗
    modal.style.display = 'flex';
    
    // 点击关闭按钮隐藏弹窗
    closeButton.addEventListener('click', function() {
      modal.style.display = 'none';
    });
    
    // 点击弹窗外部区域也可以隐藏弹窗
    window.addEventListener('click', function(event) {
      if (event.target == modal) {
        modal.style.display = 'none';
      }
    });



  })
  .catch(error => {
    console.error('提交失败:', error);
    // 在这里添加错误处理的逻辑
  });
});


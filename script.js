// 初始化所有模块
document.addEventListener('DOMContentLoaded', function() {
    initTimeDisplay();
    initTopBanner();
    initAIAssistant();
    initDataFusion();
    initGovernanceIndex();
    initSupervisionEffect();
    initActiveGovernance();
    initKeyPersonRequests();
    initChallengeIndex();
    initRiskGovernance();
    initAIPrediction();
    initPopulationPortrait();
    initTimeDimensionFilter();
    initRegionFilter();
    
    // 延迟初始化地图标记点，确保DOM完全加载
    setTimeout(function() {
        initMapMarkers();
    }, 500);
});

// 时间显示
function initTimeDisplay() {
    const timeDisplay = document.getElementById('timeDisplay');
    if (!timeDisplay) return;
    
    function updateTime() {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        const weekdays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
        const weekday = weekdays[now.getDay()];
        
        timeDisplay.textContent = `${year}-${month}-${day} ${weekday} ${hours}:${minutes}:${seconds}`;
    }
    
    updateTime();
    setInterval(updateTime, 1000);
}

// 顶部横幅按钮
function initTopBanner() {
    const flexibleSupervision = document.getElementById('flexibleSupervision');
    const activeGovernance = document.getElementById('activeGovernance');
    const aiReport = document.getElementById('aiReport');
    const exitPlatform = document.getElementById('exitPlatform');
    
    if (flexibleSupervision) {
        flexibleSupervision.addEventListener('click', function() {
            openFlexibleSupervisionModal();
        });
    }
    
    if (activeGovernance) {
        activeGovernance.addEventListener('click', function() {
            openActiveGovernanceModal();
        });
    }
    
    if (aiReport) {
        aiReport.addEventListener('click', function() {
            openAIReportModal();
        });
    }
    
    if (exitPlatform) {
        exitPlatform.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('退出按钮被点击');
            showLoginPage();
        });
    } else {
        console.error('退出按钮元素未找到');
    }
    
    // 初始化登录界面
    initLoginPage();
    
    // 初始化柔性督办和主动治理工作台
    initFlexibleSupervision();
    initActiveGovernanceModal();
    
    // 初始化AI报告弹窗
    initAIReportModal();
    
    // 初始化预警提示
    initAlertNotification();
}

// 初始化登录界面
function initLoginPage() {
    const loginPage = document.getElementById('loginPage');
    const loginForm = document.getElementById('loginForm');
    
    // 检查是否已登录（通过localStorage或sessionStorage）
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true' || sessionStorage.getItem('isLoggedIn') === 'true';
    
    if (loginPage) {
        if (isLoggedIn) {
            // 如果已登录，隐藏登录界面
            loginPage.style.display = 'none';
        } else {
            // 如果未登录，显示登录界面
            loginPage.style.display = 'flex';
        }
    }
    
    // 根据登录状态显示/隐藏主页面
    const mainContainer = document.querySelector('.container');
    const banner = document.querySelector('.top-banner');
    
    if (isLoggedIn) {
        // 已登录，显示主页面
        if (mainContainer) {
            mainContainer.style.display = 'flex';
        }
        if (banner) {
            banner.style.display = 'flex';
        }
    } else {
        // 未登录，隐藏主页面
        if (mainContainer) {
            mainContainer.style.display = 'none';
        }
        if (banner) {
            banner.style.display = 'none';
        }
    }
    
    // 登录表单提交事件
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleLogin();
        });
    }
    
    // 初始化管理界面
    initAdminModal();
}

// 初始化管理界面
function initAdminModal() {
    const adminBtn = document.getElementById('loginAdminBtn');
    const adminModal = document.getElementById('adminModal');
    const closeBtn = document.getElementById('closeAdminModal');
    const overlay = adminModal?.querySelector('.admin-modal-overlay');
    
    // 打开管理界面
    if (adminBtn) {
        adminBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            openAdminModal();
        });
    }
    
    // 关闭按钮
    if (closeBtn) {
        closeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            closeAdminModal();
        });
    }
    
    // 点击遮罩层关闭
    if (overlay) {
        overlay.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            closeAdminModal();
        });
    }
    
    // 管理菜单项点击事件
    const menuItems = adminModal?.querySelectorAll('.admin-menu-item');
    if (menuItems) {
        menuItems.forEach(item => {
            item.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                const module = this.getAttribute('data-module');
                handleAdminModuleClick(module);
            });
        });
    }
}

// 打开管理界面
function openAdminModal() {
    const adminModal = document.getElementById('adminModal');
    if (adminModal) {
        adminModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

// 关闭管理界面
function closeAdminModal() {
    const adminModal = document.getElementById('adminModal');
    if (adminModal) {
        adminModal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// 处理管理模块点击
function handleAdminModuleClick(module) {
    const moduleNames = {
        'organization': '基础组织管理',
        'permission': '权限管理',
        'model': '模型管理',
        'agent': '智能体管理',
        'database': '数据库管理',
        'api': 'API管理',
        'index': '指数管理',
        'password': '密码管理'
    };
    
    const moduleName = moduleNames[module] || '未知模块';
    alert(`打开${moduleName}功能\n\n此功能需要进一步开发实现。`);
    // 这里可以添加具体的模块功能实现
}

// 显示登录界面
function showLoginPage() {
    const loginPage = document.getElementById('loginPage');
    const mainContainer = document.querySelector('.container');
    const banner = document.querySelector('.top-banner');
    
    // 清除登录状态
    localStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('isLoggedIn');
    
    console.log('显示登录界面', loginPage, mainContainer, banner);
    
    if (loginPage) {
        loginPage.style.display = 'flex';
        // 隐藏主页面内容和横幅
        if (mainContainer) {
            mainContainer.style.display = 'none';
        }
        if (banner) {
            banner.style.display = 'none';
        }
    } else {
        console.error('登录界面元素未找到');
        alert('登录界面元素未找到，请检查HTML结构');
    }
}

// 隐藏登录界面
function hideLoginPage() {
    const loginPage = document.getElementById('loginPage');
    const mainContainer = document.querySelector('.container');
    const banner = document.querySelector('.top-banner');
    
    if (loginPage) {
        loginPage.style.display = 'none';
        // 显示主页面内容和横幅
        if (mainContainer) {
            mainContainer.style.display = 'flex';
        }
        if (banner) {
            banner.style.display = 'flex';
        }
    }
}

// 处理登录
function handleLogin() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const rememberMe = document.getElementById('rememberMe').checked;
    
    if (!username || !password) {
        alert('请输入用户名和密码');
        return;
    }
    
    // 验证登录信息
    if (username === 'admin' && password === 'yawei01') {
        // 保存登录状态
        if (rememberMe) {
            localStorage.setItem('isLoggedIn', 'true');
        } else {
            sessionStorage.setItem('isLoggedIn', 'true');
        }
        
        hideLoginPage();
        console.log('登录成功', username);
    } else {
        alert('用户名或密码错误！');
    }
}

// 初始化预警提示
function initAlertNotification() {
    const alertContainer = document.getElementById('alertNotification');
    if (!alertContainer) return;
    
    // 预警数据池
    const alertDataPool = [
        { level: 'high', text: '⚠️ AI识别到高风险诉求：市中区中心街街道出现群体性投诉，涉及人数超过50人，建议立即处理' },
        { level: 'high', text: '⚠️ AI识别到高风险诉求：薛城区临城街道发现紧急安全隐患，需要紧急响应' },
        { level: 'medium', text: '⚠️ AI识别到中风险诉求：峄城区坛山街道诉求量激增，较昨日增长120%，建议关注' },
        { level: 'medium', text: '⚠️ AI识别到中风险诉求：台儿庄区运河街道出现重复性投诉，累计超过30次' },
        { level: 'low', text: '⚠️ AI识别到低风险诉求：滕州市北辛街道诉求情绪分值偏高，建议加强沟通' },
        { level: 'low', text: '⚠️ AI识别到低风险诉求：山亭区山城街道诉求处理周期较长，建议优化流程' },
        { level: 'high', text: '⚠️ AI识别到高风险诉求：发现跨区域协同诉求，涉及多个部门，需要统筹处理' },
        { level: 'medium', text: '⚠️ AI识别到中风险诉求：某区域诉求来源多样化，需要统一管理' },
        { level: 'low', text: '⚠️ AI识别到低风险诉求：部分区域诉求周期预测较长，建议提前规划' },
        { level: 'high', text: '⚠️ AI识别到高风险诉求：发现涉及公共安全的紧急诉求，需要优先处理' }
    ];
    
    let currentTimeout = null;
    
    function showAlert() {
        // 随机选择一条预警信息
        const randomAlert = alertDataPool[Math.floor(Math.random() * alertDataPool.length)];
        
        // 设置风险级别类名
        alertContainer.className = `alert-notification level-${randomAlert.level}`;
        alertContainer.textContent = randomAlert.text;
        
        // 显示预警
        alertContainer.classList.remove('hide');
        alertContainer.classList.add('show');
        
        // 3秒后隐藏
        setTimeout(() => {
            alertContainer.classList.remove('show');
            alertContainer.classList.add('hide');
            
            // 隐藏后，设置下一次显示的随机间隔（1-5秒）
            const nextInterval = Math.random() * 4000 + 1000; // 1000-5000ms
            currentTimeout = setTimeout(showAlert, nextInterval);
        }, 3000);
    }
    
    // 首次显示延迟（1-5秒随机）
    const firstInterval = Math.random() * 4000 + 1000;
    currentTimeout = setTimeout(showAlert, firstInterval);
    
    // 返回清理函数（如果需要停止预警）
    return function stopAlert() {
        if (currentTimeout) {
            clearTimeout(currentTimeout);
            currentTimeout = null;
        }
        alertContainer.classList.remove('show');
        alertContainer.classList.add('hide');
    };
}

// 时间维度过滤器
function initTimeDimensionFilter() {
    const timeDimension = document.getElementById('timeDimension');
    if (!timeDimension) return;
    
    // 存储当前选择的时间维度
    window.currentTimeDimension = timeDimension.value || 'last7days';
    
    timeDimension.addEventListener('change', function() {
        const selectedValue = this.value;
        window.currentTimeDimension = selectedValue;
        
        // 触发数据更新
        updateDataByFilters();
        
        console.log('时间维度已更改为:', getTimeDimensionLabel(selectedValue));
    });
}

// 获取时间维度标签
function getTimeDimensionLabel(value) {
    const labels = {
        'last7days': '近7天',
        'last30days': '近30天',
        'thisWeek': '本周',
        'lastWeek': '上周',
        'thisMonth': '本月',
        'lastMonth': '上月',
        'thisYear': '今年',
        'lastYear': '去年'
    };
    return labels[value] || value;
}

// 地区过滤器
function initRegionFilter() {
    const regionFilter = document.getElementById('regionFilter');
    if (!regionFilter) return;
    
    // 存储当前选择的地区
    window.currentRegion = regionFilter.value || 'all';
    
    regionFilter.addEventListener('change', function() {
        const selectedValue = this.value;
        window.currentRegion = selectedValue;
        
        // 触发数据更新
        updateDataByFilters();
        
        console.log('地区已更改为:', this.options[this.selectedIndex].text);
    });
}

// 根据筛选条件更新数据
function updateDataByFilters() {
    const timeDimension = window.currentTimeDimension || 'last7days';
    const region = window.currentRegion || 'all';
    
    console.log('更新数据 - 时间维度:', getTimeDimensionLabel(timeDimension), '地区:', region);
    
    // 这里可以根据时间维度和地区更新各个模块的数据
    // 例如：更新图表、统计数据等
    
    // 更新图表数据（示例）
    if (window.predictionChart && window.predictionChartOption) {
        // 根据新的筛选条件更新预测图表
        updatePrediction();
    }
    
    // 可以调用其他数据更新函数
    // updateModuleData(timeDimension, region);
}

// 数字递增动画函数
function animateNumber(element, startValue, endValue, duration = 1000, unit = '') {
    if (!element) return;
    
    const startTime = Date.now();
    const difference = endValue - startValue;
    
    function update() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // 使用缓动函数
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        const currentValue = Math.floor(startValue + difference * easeProgress);
        
        element.textContent = currentValue.toLocaleString() + unit;
        
        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            element.textContent = endValue.toLocaleString() + unit;
        }
    }
    
    requestAnimationFrame(update);
}

// 滚动数字动画
function animateRollingNumber(element, startValue, endValue, duration = 800, unit = '') {
    if (!element) return;
    
    const startTime = Date.now();
    const difference = endValue - startValue;
    const absDifference = Math.abs(difference);
    
    // 如果变化太小，直接更新
    if (absDifference === 0) return;
    
    // 添加滚动动画类
    element.classList.add('rolling');
    
    // 初始位置
    if (difference > 0) {
        element.style.transform = 'translateY(8px)';
        element.style.opacity = '0.6';
    } else {
        element.style.transform = 'translateY(-8px)';
        element.style.opacity = '0.6';
    }
    
    function update() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // 使用缓动函数
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        const currentValue = Math.floor(startValue + difference * easeProgress);
        
        element.textContent = currentValue.toLocaleString() + unit;
        element.setAttribute('data-current', currentValue);
        
        // 添加滚动效果 - 从初始位置滚动到最终位置
        if (difference > 0) {
            const translateY = 8 * (1 - easeProgress);
            element.style.transform = `translateY(${translateY}px)`;
            element.style.opacity = (0.6 + 0.4 * easeProgress).toString();
        } else {
            const translateY = -8 * (1 - easeProgress);
            element.style.transform = `translateY(${translateY}px)`;
            element.style.opacity = (0.6 + 0.4 * easeProgress).toString();
        }
        
        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            element.textContent = endValue.toLocaleString() + unit;
            element.setAttribute('data-current', endValue);
            element.style.transform = 'translateY(0)';
            element.style.opacity = '1';
            element.classList.remove('rolling');
        }
    }
    
    requestAnimationFrame(update);
}

// 数据融合模块 - 动态更新数据
function initDataFusion() {
    const totalData = document.getElementById('totalData');
    const todayData = document.getElementById('todayData');
    const dataFusionModule = document.getElementById('dataFusionModule');
    const dataFusionModal = document.getElementById('dataFusionModal');
    const closeModalBtn = document.getElementById('closeDataFusionModal');
    const modalOverlay = dataFusionModal ? dataFusionModal.querySelector('.modal-overlay') : null;
    
    // 初始化数据
    if (totalData) {
        const initialTotal = Math.floor(Math.random() * (6000000 - 5844353 + 1) + 5844353);
        totalData.textContent = initialTotal.toLocaleString();
    }
    
    if (todayData) {
        const initialToday = Math.floor(Math.random() * (4111 - 3711 + 1) + 3711);
        todayData.textContent = initialToday.toLocaleString();
    }
    
    // 定期更新数据
    setInterval(() => {
        if (totalData) {
            const current = parseInt(totalData.textContent.replace(/,/g, ''));
            // 在5844353~6000000范围内随机生成新值
            const newTotal = Math.floor(Math.random() * (6000000 - 5844353 + 1) + 5844353);
            animateNumber(totalData, current, newTotal, 1500);
        }
        
        if (todayData) {
            const current = parseInt(todayData.textContent.replace(/,/g, ''));
            // 在3711~4111范围内随机生成新值
            const newToday = Math.floor(Math.random() * (4111 - 3711 + 1) + 3711);
            animateNumber(todayData, current, newToday, 1500);
        }
    }, 5000);
    
    // 打开弹窗
    if (dataFusionModule && dataFusionModal) {
        dataFusionModule.addEventListener('click', function(e) {
            e.stopPropagation();
            openDataFusionModal();
        });
    }
    
    // 关闭弹窗
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            closeDataFusionModal();
        });
    }
    
    if (modalOverlay) {
        modalOverlay.addEventListener('click', function(e) {
            e.stopPropagation();
            closeDataFusionModal();
        });
    }
    
    // 阻止弹窗内容区域点击关闭
    const modalContent = dataFusionModal ? dataFusionModal.querySelector('.modal-content') : null;
    if (modalContent) {
        modalContent.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }
}

// 打开数据融合弹窗
function openDataFusionModal() {
    const modal = document.getElementById('dataFusionModal');
    const channelsOverview = document.getElementById('channelsOverview');
    const aiSummary = document.getElementById('dataFusionAISummary');
    const aiSummarySection = document.querySelector('.ai-summary-section');
    const thinkingChain = document.getElementById('thinkingChain');
    
    if (!modal) return;
    
    // 清空内容
    if (aiSummary) {
        aiSummary.innerHTML = '';
    }
    if (channelsOverview) {
        channelsOverview.innerHTML = '';
        channelsOverview.classList.remove('visible');
    }
    if (aiSummarySection) {
        aiSummarySection.classList.remove('visible');
    }
    
    // 显示思考链
    if (thinkingChain) {
        thinkingChain.classList.remove('hidden');
    }
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // 延迟显示AI总结，实现思考过程
    setTimeout(() => {
        if (aiSummary && aiSummarySection) {
            // 先让section可见
            aiSummarySection.classList.add('visible');
            // 然后开始生成文字
            generateDataFusionAISummary(aiSummary);
            
            // AI总结生成完成后，隐藏思考链并显示数据概览
            setTimeout(() => {
                if (thinkingChain) {
                    thinkingChain.classList.add('hidden');
                }
                if (channelsOverview) {
                    generateChannelsOverview(channelsOverview);
                    channelsOverview.classList.add('visible');
                }
            }, 5100); // AI总结5秒 + 0.1秒缓冲
        }
    }, 300);
}

// 打开善治指数弹窗
function openGovernanceIndexModal(indexType) {
    const modal = document.getElementById('governanceIndexModal');
    const modalTitle = document.getElementById('governanceModalTitle');
    const secondaryList = document.getElementById('secondaryIndicatorsList');
    const tertiaryDetail = document.getElementById('tertiaryIndicatorsDetail');
    
    if (!modal || !secondaryList || !tertiaryDetail) return;
    
    // 设置标题
    if (modalTitle) {
        if (indexType === 'publicWelfare') {
            modalTitle.textContent = '"枣解决 枣满意"民生指数详情';
        } else if (indexType === 'marketEntities') {
            modalTitle.textContent = '"枣解决 枣满意"市场主体指数详情';
        }
    }
    
    // 生成二级指标列表和三级指标详情
    generateGovernanceIndexContent(indexType, secondaryList, tertiaryDetail);
    
    // 显示弹窗，添加动画类
    modal.style.display = 'flex';
    // 使用requestAnimationFrame确保display生效后再添加动画类
    requestAnimationFrame(() => {
        modal.classList.add('show');
    });
}

// 关闭善治指数弹窗
function closeGovernanceIndexModal() {
    const modal = document.getElementById('governanceIndexModal');
    if (modal) {
        modal.classList.remove('show');
        modal.classList.add('hide');
        // 延迟隐藏，等待动画完成
        setTimeout(() => {
            modal.style.display = 'none';
            modal.classList.remove('hide');
        }, 400);
    }
}

// 获取善治指数数据
function getGovernanceData() {
    return {
        publicWelfareIndex: {
            name: '民生指数',
            englishName: 'Public Welfare Index',
            indicators: [
                {
                    name: '公共安全',
                    items: [
                        { name: '城市治安', count: Math.floor(Math.random() * 5000 + 1000) },
                        { name: '自然灾害应急响应', count: Math.floor(Math.random() * 3000 + 500) },
                        { name: '火灾防控', count: Math.floor(Math.random() * 4000 + 800) },
                        { name: '交通安全', count: Math.floor(Math.random() * 6000 + 1500) }
                    ]
                },
                {
                    name: '安居保障',
                    items: [
                        { name: '住房保障', count: Math.floor(Math.random() * 8000 + 2000) },
                        { name: '城市住房租赁市场的稳定性', count: Math.floor(Math.random() * 5000 + 1200) },
                        { name: '住房价格与居民收入比', count: Math.floor(Math.random() * 6000 + 1500) },
                        { name: '租房市场的公平性与透明度', count: Math.floor(Math.random() * 4000 + 1000) }
                    ]
                },
                {
                    name: '教育惠民',
                    items: [
                        { name: '教育资源', count: Math.floor(Math.random() * 7000 + 1800) },
                        { name: '义务教育', count: Math.floor(Math.random() * 6000 + 1500) },
                        { name: '高等教育接入率', count: Math.floor(Math.random() * 4000 + 1000) },
                        { name: '教育支出', count: Math.floor(Math.random() * 5000 + 1200) }
                    ]
                },
                {
                    name: '医疗卫生',
                    items: [
                        { name: '医疗资源分配', count: Math.floor(Math.random() * 9000 + 2500) },
                        { name: '医疗服务', count: Math.floor(Math.random() * 10000 + 3000) }
                    ]
                },
                {
                    name: '文体旅服务',
                    items: [
                        { name: '公共文化设施的普及度', count: Math.floor(Math.random() * 4000 + 1000) },
                        { name: '文化活动参与度', count: Math.floor(Math.random() * 5000 + 1200) },
                        { name: '文体旅游产业的推动力', count: Math.floor(Math.random() * 6000 + 1500) },
                        { name: '社区体育设施建设', count: Math.floor(Math.random() * 4500 + 1100) }
                    ]
                },
                {
                    name: '就业保障',
                    items: [
                        { name: '城市失业', count: Math.floor(Math.random() * 7000 + 2000) },
                        { name: '就业培训', count: Math.floor(Math.random() * 5000 + 1200) },
                        { name: '社会就业服务体系', count: Math.floor(Math.random() * 6000 + 1500) },
                        { name: '新兴产业就业机会', count: Math.floor(Math.random() * 5500 + 1300) }
                    ]
                },
                {
                    name: '社会保障',
                    items: [
                        { name: '社会福利', count: Math.floor(Math.random() * 8000 + 2000) },
                        { name: '贫困人口的保障力度', count: Math.floor(Math.random() * 6000 + 1500) },
                        { name: '对弱势群体的支持政策', count: Math.floor(Math.random() * 5000 + 1200) }
                    ]
                },
                {
                    name: '养老服务',
                    items: [
                        { name: '养老服务设施', count: Math.floor(Math.random() * 6000 + 1500) },
                        { name: '养老服务质量评价', count: Math.floor(Math.random() * 5000 + 1200) },
                        { name: '老年人社会活动参与度', count: Math.floor(Math.random() * 4000 + 1000) }
                    ]
                }
            ]
        },
        marketEntitiesIndex: {
            name: '市场主体指数',
            englishName: 'Market Entities Index',
            indicators: [
                {
                    name: '企业创新能力',
                    items: [
                        { name: '企业研发投入', count: Math.floor(Math.random() * 5000 + 1200) },
                        { name: '新兴技术应用', count: Math.floor(Math.random() * 6000 + 1500) },
                        { name: '高技术产业发展', count: Math.floor(Math.random() * 5500 + 1300) }
                    ]
                },
                {
                    name: '市场竞争力',
                    items: [
                        { name: '企业市场', count: Math.floor(Math.random() * 8000 + 2000) },
                        { name: '市场准入', count: Math.floor(Math.random() * 6000 + 1500) },
                        { name: '市场透明度与公平性', count: Math.floor(Math.random() * 7000 + 1800) },
                        { name: '企业的创新竞争力', count: Math.floor(Math.random() * 5500 + 1300) }
                    ]
                },
                {
                    name: '营商环境优化',
                    items: [
                        { name: '优惠政策', count: Math.floor(Math.random() * 7000 + 1800) },
                        { name: '行政审批流程的高效性', count: Math.floor(Math.random() * 9000 + 2500) },
                        { name: '企业融资渠道的多样性', count: Math.floor(Math.random() * 6000 + 1500) },
                        { name: '企业服务平台现状', count: Math.floor(Math.random() * 5500 + 1300) }
                    ]
                },
                {
                    name: '劳动力市场质量',
                    items: [
                        { name: '劳动力市场', count: Math.floor(Math.random() * 8000 + 2000) },
                        { name: '技能培训', count: Math.floor(Math.random() * 6000 + 1500) },
                        { name: '劳动力市场的需求与供给匹配度', count: Math.floor(Math.random() * 7000 + 1800) },
                        { name: '劳动条件与权益保障', count: Math.floor(Math.random() * 6500 + 1600) }
                    ]
                },
                {
                    name: '绿色发展',
                    items: [
                        { name: '企业环保', count: Math.floor(Math.random() * 7000 + 1800) },
                        { name: '企业绿色产品比例', count: Math.floor(Math.random() * 5000 + 1200) },
                        { name: '环保政策实施效果', count: Math.floor(Math.random() * 6000 + 1500) },
                        { name: '企业绿色转型进度', count: Math.floor(Math.random() * 5500 + 1300) }
                    ]
                },
                {
                    name: '数字化转型',
                    items: [
                        { name: '企业数字化程度', count: Math.floor(Math.random() * 8000 + 2000) },
                        { name: '基础设施建设', count: Math.floor(Math.random() * 9000 + 2500) },
                        { name: '电子商务与互联网+的普及率', count: Math.floor(Math.random() * 7000 + 1800) },
                        { name: '数字经济发展', count: Math.floor(Math.random() * 7500 + 1900) }
                    ]
                },
                {
                    name: '外贸依存度',
                    items: [
                        { name: '外贸企业的竞争力', count: Math.floor(Math.random() * 5000 + 1200) },
                        { name: '国际市场开拓能力', count: Math.floor(Math.random() * 4500 + 1100) },
                        { name: '外资企业的投资环境', count: Math.floor(Math.random() * 5500 + 1300) }
                    ]
                },
                {
                    name: '法律与规范化',
                    items: [
                        { name: '法律环境', count: Math.floor(Math.random() * 7000 + 1800) },
                        { name: '知识产权保护力度', count: Math.floor(Math.random() * 6000 + 1500) },
                        { name: '企业合规性', count: Math.floor(Math.random() * 7500 + 1900) },
                        { name: '市场规范化程度', count: Math.floor(Math.random() * 8000 + 2000) }
                    ]
                }
            ]
        }
    };
}

// 生成善治指数弹窗内容
function generateGovernanceIndexContent(indexType, secondaryList, tertiaryDetail) {
    // 获取数据
    const governanceData = getGovernanceData();
    
    // 根据indexType选择数据
    let selectedData = null;
    if (indexType === 'publicWelfare') {
        selectedData = governanceData.publicWelfareIndex;
    } else if (indexType === 'marketEntities') {
        selectedData = governanceData.marketEntitiesIndex;
    } else {
        return;
    }
    
    // 生成二级指标列表（左侧）
    let secondaryListHTML = '';
    selectedData.indicators.forEach((indicator, index) => {
        secondaryListHTML += `
            <div class="secondary-indicator-item ${index === 0 ? 'active' : ''}" 
                 data-indicator-index="${index}">
                <div class="secondary-indicator-name">${indicator.name}</div>
            </div>
        `;
    });
    secondaryList.innerHTML = secondaryListHTML;
    
    // 默认显示第一个二级指标的详情
    if (selectedData.indicators.length > 0) {
        showTertiaryIndicators(selectedData.indicators[0], tertiaryDetail);
    }
    
    // 绑定二级指标点击事件
    const secondaryItems = secondaryList.querySelectorAll('.secondary-indicator-item');
    secondaryItems.forEach(item => {
        item.addEventListener('click', function() {
            // 移除所有active类
            secondaryItems.forEach(i => i.classList.remove('active'));
            // 添加active类到当前项
            this.classList.add('active');
            
            // 获取指标索引
            const indicatorIndex = parseInt(this.getAttribute('data-indicator-index'));
            // 显示对应的三级指标
            showTertiaryIndicators(selectedData.indicators[indicatorIndex], tertiaryDetail);
        });
    });
}

// 显示三级指标详情
function showTertiaryIndicators(indicator, container) {
    const totalCount = indicator.items.reduce((sum, item) => sum + item.count, 0);
    
    let html = `
        <div class="tertiary-indicators-header">
            <div class="header-top">
                <h4>${indicator.name}</h4>
                <div class="header-buttons">
                    <button class="ai-analysis-btn" data-indicator="${indicator.name}">AI分析</button>
                </div>
            </div>
            <div class="tertiary-total">总诉求数: ${totalCount.toLocaleString()}条</div>
        </div>
        <div class="tertiary-indicators-list">
    `;
    
    indicator.items.forEach(item => {
        html += `
            <div class="tertiary-indicator-item">
                <div class="tertiary-indicator-info">
                    <div class="tertiary-indicator-name">${item.name}</div>
                    <div class="tertiary-indicator-count">${item.count.toLocaleString()}条</div>
                </div>
                <div class="tertiary-indicator-buttons">
                    <button class="ai-analysis-btn" data-item="${item.name}" data-indicator="${indicator.name}">AI分析</button>
                </div>
            </div>
        `;
    });
    
    html += `
        </div>
    `;
    
    container.innerHTML = html;
    
    // 绑定按钮事件
    const aiAnalysisBtns = container.querySelectorAll('.ai-analysis-btn');
    
    aiAnalysisBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const indicatorName = this.getAttribute('data-indicator');
            const itemName = this.getAttribute('data-item') || null;
            openAIAnalysisModal(indicatorName, itemName);
        });
    });
}

// 显示地区总览弹窗
function showRegionOverview(indicatorName, itemName) {
    const modal = document.getElementById('regionOverviewModal');
    if (!modal) return;
    
    const modalTitle = document.getElementById('regionOverviewModalTitle');
    if (modalTitle) {
        modalTitle.textContent = `${indicatorName}${itemName ? ' - ' + itemName : ''} - 地区总览`;
    }
    
    // 清除之前的地图预览内容
    const mapPreviewContainer = document.querySelector('.map-preview-container');
    if (mapPreviewContainer) {
        mapPreviewContainer.innerHTML = `
            <div class="map-preview-note">点击下方按钮查看该领域的诉求分布区域</div>
            <button class="update-map-btn" id="updateMapBtn">更新地图标记</button>
            <div class="region-map-preview" id="regionMapPreview"></div>
        `;
    }
    
    // 显示弹窗
    modal.style.display = 'flex';
    
    // 绑定更新地图按钮事件
    const updateMapBtn = document.getElementById('updateMapBtn');
    if (updateMapBtn) {
        // 移除旧的事件监听器
        const newBtn = updateMapBtn.cloneNode(true);
        updateMapBtn.parentNode.replaceChild(newBtn, updateMapBtn);
        
        // 添加新的事件监听器
        newBtn.addEventListener('click', function() {
            updateMapPreviewForRegion(indicatorName, itemName);
        });
    }
}

// 更新地图预览（在弹窗内显示）
function updateMapPreviewForRegion(indicatorName, itemName) {
    const mapPreview = document.getElementById('regionMapPreview');
    if (!mapPreview) return;
    
    // 生成区域数据
    const regionData = generateRegionDataForIndicator(indicatorName, itemName);
    
    // 创建地图预览内容
    let previewHTML = '<div class="region-map-list">';
    regionData.forEach((region, index) => {
        previewHTML += `
            <div class="region-map-item">
                <div class="region-map-marker" style="--marker-color: ${getMarkerColor(region.type)};">
                    <span class="marker-icon">📍</span>
                    <span class="marker-count">${region.count}</span>
                </div>
                <div class="region-map-info">
                    <div class="region-map-name">${region.area}</div>
                    <div class="region-map-details">诉求数量: ${region.count}条 | 类型: ${getTypeText(region.type)}</div>
                </div>
            </div>
        `;
    });
    previewHTML += '</div>';
    
    mapPreview.innerHTML = previewHTML;
}

// 获取标记颜色
function getMarkerColor(type) {
    const colors = {
        high: '#ff5722',
        medium: '#ff9800',
        low: '#4caf50'
    };
    return colors[type] || colors.medium;
}

// 获取类型文本
function getTypeText(type) {
    const texts = {
        high: '高诉求',
        medium: '中诉求',
        low: '低诉求'
    };
    return texts[type] || '中诉求';
}

// 根据指标生成区域数据
function generateRegionDataForIndicator(indicatorName, itemName) {
    // 基础区域位置
    const baseRegions = [
        { name: '市中区核心', x: 38, y: 38 },
        { name: '市中区东', x: 45, y: 35 },
        { name: '市中区南', x: 40, y: 42 },
        { name: '薛城区中心', x: 50, y: 50 },
        { name: '薛城区西', x: 57, y: 55 },
        { name: '峄城区中心', x: 55, y: 58 },
        { name: '峄城区北', x: 56, y: 56 },
        { name: '台儿庄区中心', x: 52, y: 58 },
        { name: '台儿庄区南', x: 54, y: 60 },
        { name: '山亭区中心', x: 42, y: 55 },
        { name: '山亭区西', x: 58, y: 56 },
        { name: '滕州市中心', x: 52, y: 38 },
        { name: '滕州市东', x: 59, y: 56 },
        { name: '高新区', x: 45, y: 47 },
        { name: '经济开发区', x: 57, y: 57 },
        { name: '新城区', x: 48, y: 42 },
        { name: '老城区', x: 44, y: 53 },
        { name: '滨湖新区', x: 51, y: 45 }
    ];
    
    // 根据指标名称生成不同的分布
    const regions = [];
    const selectedCount = Math.min(12, baseRegions.length);
    const selectedIndices = [];
    
    // 随机选择区域
    while (selectedIndices.length < selectedCount) {
        const index = Math.floor(Math.random() * baseRegions.length);
        if (!selectedIndices.includes(index)) {
            selectedIndices.push(index);
        }
    }
    
    selectedIndices.forEach((index, i) => {
        const region = baseRegions[index];
        // 根据指标类型决定诉求数量
        let count = Math.floor(Math.random() * 50 + 10);
        let type = 'medium';
        
        if (i < 3) {
            type = 'high';
            count = Math.floor(Math.random() * 100 + 50);
        } else if (i >= selectedCount - 3) {
            type = 'low';
            count = Math.floor(Math.random() * 30 + 5);
        }
        
        regions.push({
            area: region.name,
            x: region.x,
            y: region.y,
            type: type,
            count: count
        });
    });
    
    return regions;
}

// 打开AI分析弹窗
function openAIAnalysisModal(indicatorName, itemName) {
    const modal = document.getElementById('aiAnalysisModal');
    if (!modal) return;
    
    const modalTitle = document.getElementById('aiAnalysisModalTitle');
    const summaryContainer = document.getElementById('aiAnalysisSummary');
    const tableBody = document.getElementById('demandTableBody');
    
    if (modalTitle) {
        modalTitle.textContent = `${indicatorName}${itemName ? ' - ' + itemName : ''} - AI分析`;
    }
    
    // 生成AI总结
    if (summaryContainer) {
        summaryContainer.innerHTML = '<div class="thinking-chain"><div class="thinking-dot"></div><div class="thinking-dot"></div><div class="thinking-dot"></div></div><div class="ai-analysis-summary-text"></div>';
        const summaryText = summaryContainer.querySelector('.ai-analysis-summary-text');
        
        // 生成AI总结文本
        const summary = generateAIAnalysisSummary(indicatorName, itemName);
        
        // 逐字生成文本
        generateTextGradually(summaryText, summary, 3000);
    }
    
    // 生成诉求来源表格数据
    if (tableBody) {
        const demandData = generateDemandSourceData(indicatorName, itemName);
        let tableHTML = '';
        demandData.forEach(row => {
            tableHTML += `
                <tr>
                    <td>${row.time}</td>
                    <td>${row.location}</td>
                    <td>${row.content}</td>
                </tr>
            `;
        });
        tableBody.innerHTML = tableHTML;
    }
    
    // 显示弹窗
    modal.style.display = 'flex';
}

// 关闭AI分析弹窗
function closeAIAnalysisModal() {
    const modal = document.getElementById('aiAnalysisModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// 关闭地区总览弹窗
function closeRegionOverviewModal() {
    const modal = document.getElementById('regionOverviewModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// 生成AI分析总结
function generateAIAnalysisSummary(indicatorName, itemName) {
    const summaries = {
        '公共安全': '根据数据分析，公共安全领域诉求主要集中在城市治安管理、自然灾害应急响应、火灾防控和交通安全等方面。其中交通安全类诉求占比最高，达到35%，主要涉及交通信号灯设置不合理、道路标线不清等问题。城市治安类诉求占比28%，主要集中在老旧小区治安管理、夜间巡逻等方面。建议加强重点区域的治安巡逻力度，完善交通基础设施，提升应急响应能力。',
        '安居保障': '安居保障领域诉求主要围绕住房保障政策、租赁市场稳定性和住房价格等方面。数据显示，住房保障类诉求占比最高，达到42%，反映了市民对保障性住房的迫切需求。租赁市场稳定性问题占比25%，主要集中在租金上涨过快、租赁合同纠纷等方面。建议加快保障性住房建设进度，完善租赁市场监管机制，确保市场平稳健康发展。',
        '教育惠民': '教育惠民领域诉求主要集中在教育资源分配、义务教育质量和教育支出等方面。义务教育类诉求占比38%，主要涉及学区划分、教学质量、教育公平等问题。教育资源分配问题占比32%，反映了教育资源分布不均衡的问题。建议优化教育资源布局，加强师资队伍建设，提升教育质量，促进教育公平。',
        '医疗卫生': '医疗卫生领域诉求主要集中在医疗资源分配和医疗服务质量等方面。医疗资源分配问题占比45%，主要反映医疗资源分布不均、优质医疗资源集中等问题。医疗服务类诉求占比35%，涉及医疗服务态度、医疗费用、就医便利性等方面。建议优化医疗资源布局，提升基层医疗服务能力，改善医疗服务体验，降低医疗成本。',
        '文体旅服务': '文体旅服务领域诉求主要集中在公共文化设施普及度、文化活动参与度和旅游产业发展等方面。公共文化设施普及度问题占比40%，反映市民对更多文化设施的需求。文化活动参与度问题占比30%，主要涉及活动宣传不足、活动形式单一等问题。建议加大公共文化设施建设投入，丰富文化活动形式，提升市民文化参与度。',
        '就业保障': '就业保障领域诉求主要集中在城市失业、就业培训和就业机会等方面。就业培训类诉求占比35%，主要涉及培训内容与实际需求不匹配、培训质量有待提升等问题。就业机会问题占比30%，反映就业信息不对称、就业渠道单一等问题。建议完善就业培训体系，提升培训质量，拓展就业渠道，促进高质量就业。',
        '社会保障': '社会保障领域诉求主要集中在社会福利、贫困人口保障和弱势群体支持等方面。社会福利类诉求占比42%，主要涉及社保政策宣传不足、社保办理流程复杂等问题。贫困人口保障问题占比28%，反映保障标准、保障覆盖面等方面的诉求。建议加强社保政策宣传，简化办理流程，提升保障标准，扩大保障覆盖面。',
        '养老服务': '养老服务领域诉求主要集中在养老服务设施、服务质量和老年人社会活动参与度等方面。养老服务设施问题占比45%，反映养老服务设施不足、设施分布不均等问题。服务质量问题占比35%，涉及服务态度、服务内容、服务专业性等方面。建议加快养老服务设施建设，提升服务质量，丰富服务内容，促进老年人社会参与。'
    };
    
    let summary = summaries[indicatorName] || `根据数据分析，${indicatorName}领域诉求主要集中在相关方面的管理和服务优化。建议加强相关领域的治理力度，完善服务机制，提升服务质量，满足市民需求。`;
    
    if (itemName) {
        summary = `针对${itemName}的具体分析：${summary}在${itemName}方面，需要重点关注服务质量和响应效率，加强监管力度，完善服务流程，提升市民满意度。`;
    }
    
    return summary;
}

// 生成诉求来源数据
function generateDemandSourceData(indicatorName, itemName) {
    const locations = ['市中区', '薛城区', '峄城区', '台儿庄区', '山亭区', '滕州市', '高新区', '经济开发区', '新城区', '老城区'];
    const timeRanges = ['今天', '昨天', '2天前', '3天前', '4天前', '5天前', '6天前', '7天前', '8天前', '9天前', '10天前'];
    
    const demandTemplates = {
        '公共安全': ['关于城市治安管理的诉求', '关于自然灾害应急响应的建议', '关于火灾防控措施的咨询', '关于交通安全管理的投诉'],
        '安居保障': ['关于住房保障政策的咨询', '关于租赁市场稳定性的诉求', '关于住房价格的建议', '关于租房市场公平性的投诉'],
        '教育惠民': ['关于教育资源分配的诉求', '关于义务教育质量的建议', '关于高等教育接入率的咨询', '关于教育支出的投诉'],
        '医疗卫生': ['关于医疗资源分配的建议', '关于医疗服务质量的诉求', '关于就医便利性的咨询', '关于医疗费用的投诉'],
        '文体旅服务': ['关于公共文化设施普及度的诉求', '关于文化活动参与度的建议', '关于旅游产业发展的咨询', '关于体育设施建设的投诉'],
        '就业保障': ['关于城市失业问题的诉求', '关于就业培训质量的建议', '关于就业服务体系的咨询', '关于就业机会的投诉'],
        '社会保障': ['关于社会福利政策的诉求', '关于贫困人口保障的建议', '关于弱势群体支持的咨询', '关于社会保障制度的投诉'],
        '养老服务': ['关于养老服务设施建设的诉求', '关于养老服务质量评价的建议', '关于老年人社会活动参与度的咨询', '关于养老服务政策的投诉']
    };
    
    const templates = demandTemplates[indicatorName] || ['关于相关领域的诉求', '关于相关政策的建议', '关于相关服务的咨询', '关于相关问题的投诉'];
    
    const data = [];
    for (let i = 0; i < 15; i++) {
        const location = locations[Math.floor(Math.random() * locations.length)];
        const time = timeRanges[Math.floor(Math.random() * timeRanges.length)];
        const template = templates[Math.floor(Math.random() * templates.length)];
        
        let content = template;
        if (itemName) {
            content = `关于${itemName}的${template.replace(/关于.*?的/, '')}`;
        }
        
        // 添加具体内容描述
        const details = ['需要尽快处理', '希望相关部门关注', '建议改进服务', '要求给出解决方案'];
        const detail = details[Math.floor(Math.random() * details.length)];
        content += `，${detail}。`;
        
        data.push({
            time: time,
            location: location,
            content: content
        });
    }
    
    return data;
}

// 逐字生成文本
function generateTextGradually(element, text, duration) {
    if (!element) return;
    
    const chars = Array.from(text);
    const charDelay = duration / chars.length;
    let charIndex = 0;
    
    element.textContent = '';
    
    function addChar() {
        if (charIndex < chars.length) {
            element.textContent += chars[charIndex];
            charIndex++;
            setTimeout(addChar, charDelay);
        }
    }
    
    addChar();
}

// 关闭数据融合弹窗
function closeDataFusionModal() {
    const modal = document.getElementById('dataFusionModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// 生成渠道数据概览
function generateChannelsOverview(container) {
    const channels = [
        {
            name: '12345来电',
            totalCount: 2456789,
            todayCount: 1234,
            monthlyCount: 67890,
            averageResponseTime: '2.3分钟',
            satisfactionRate: '94.5%',
            description: '政务热线服务，7×24小时全天候接听市民来电'
        },
        {
            name: '"两枣"网络端',
            totalCount: 892345,
            todayCount: 567,
            monthlyCount: 23456,
            averageResponseTime: '1.8分钟',
            satisfactionRate: '96.2%',
            description: '枣庄市政务服务平台网络端，在线受理各类诉求'
        },
        {
            name: '市场主体',
            totalCount: 567890,
            todayCount: 345,
            monthlyCount: 15678,
            averageResponseTime: '3.1分钟',
            satisfactionRate: '92.8%',
            description: '企业注册、变更、注销等市场主体相关服务'
        },
        {
            name: '110转接',
            totalCount: 234567,
            todayCount: 189,
            monthlyCount: 6789,
            averageResponseTime: '5.2分钟',
            satisfactionRate: '89.3%',
            description: '110报警平台转接的非警务类求助事项'
        },
        {
            name: '市政府网站',
            totalCount: 345678,
            todayCount: 234,
            monthlyCount: 9876,
            averageResponseTime: '4.5分钟',
            satisfactionRate: '93.7%',
            description: '枣庄市政府门户网站留言板、在线咨询等'
        },
        {
            name: '省政府网站',
            totalCount: 189234,
            todayCount: 156,
            monthlyCount: 5432,
            averageResponseTime: '6.8分钟',
            satisfactionRate: '91.5%',
            description: '山东省政府网站转办的枣庄相关诉求'
        },
        {
            name: '省接诉即办',
            totalCount: 456789,
            todayCount: 298,
            monthlyCount: 12345,
            averageResponseTime: '3.9分钟',
            satisfactionRate: '95.1%',
            description: '山东省接诉即办平台转办的各类诉求'
        },
        {
            name: '中国政府网留言',
            totalCount: 123456,
            todayCount: 89,
            monthlyCount: 3456,
            averageResponseTime: '8.2分钟',
            satisfactionRate: '88.6%',
            description: '中国政府网留言板转办至枣庄的相关事项'
        },
        {
            name: '互联网+督查',
            totalCount: 98765,
            todayCount: 67,
            monthlyCount: 2134,
            averageResponseTime: '12.5分钟',
            satisfactionRate: '87.2%',
            description: '国务院"互联网+督查"平台转办的督查事项'
        }
    ];
    
    const totalCount = channels.reduce((sum, ch) => sum + ch.totalCount, 0);
    const todayTotal = channels.reduce((sum, ch) => sum + ch.todayCount, 0);
    
    // 添加标题
    container.innerHTML = '<div class="channels-overview-title">数据渠道概览</div>' + 
        channels.map((channel, index) => {
        const percentage = ((channel.totalCount / totalCount) * 100).toFixed(1);
        return `
            <div class="channel-overview-item" style="animation-delay: ${index * 0.1}s">
                <div class="channel-overview-name">${channel.name}</div>
                <div class="channel-overview-chart">
                    <div class="channel-chart-bar">
                        <div class="channel-chart-fill" style="width: 0%; transition: width 0.8s ease ${index * 0.1 + 0.3}s" data-width="${percentage}"></div>
                    </div>
                </div>
                <div class="channel-overview-data">
                    <div class="channel-data-value" data-value="${channel.totalCount}">0</div>
                    <div class="channel-data-percentage" data-percentage="${percentage}">0%</div>
                </div>
            </div>
        `;
    }).join('');
    
    // 延迟设置实际值和宽度，实现动画效果
    setTimeout(() => {
        const items = container.querySelectorAll('.channel-overview-item');
        items.forEach((item, index) => {
            const channel = channels[index];
            const percentage = ((channel.totalCount / totalCount) * 100).toFixed(1);
            const fill = item.querySelector('.channel-chart-fill');
            const valueEl = item.querySelector('.channel-data-value');
            const percentageEl = item.querySelector('.channel-data-percentage');
            
            if (fill) {
                fill.style.width = percentage + '%';
            }
            
            // 数字递增动画
            if (valueEl && channel) {
                const targetValue = parseInt(valueEl.getAttribute('data-value')) || channel.totalCount;
                animateNumber(valueEl, 0, targetValue, 1000);
            }
            if (percentageEl && channel) {
                // 百分比动画
                const targetPercentage = parseFloat(percentageEl.getAttribute('data-percentage')) || parseFloat(percentage);
                const startTime = Date.now();
                const duration = 1000;
                function updatePercentage() {
                    const elapsed = Date.now() - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    const easeProgress = 1 - Math.pow(1 - progress, 3);
                    const currentValue = (targetPercentage * easeProgress).toFixed(1);
                    percentageEl.textContent = currentValue + '%';
                    if (progress < 1) {
                        requestAnimationFrame(updatePercentage);
                    } else {
                        percentageEl.textContent = targetPercentage.toFixed(1) + '%';
                    }
                }
                requestAnimationFrame(updatePercentage);
            }
            
            item.classList.add('visible');
        });
    }, 100);
}

// 生成数据融合AI总结（逐字显示效果，5秒完成）
function generateDataFusionAISummary(container) {
    const fullText = `
        <p><strong>一、数据规模与增长态势</strong></p>
        <p>根据平台实时监测，当前数据融合总量已达到 <strong>585万至600万条</strong>，今日新增数据量在 <strong>3711至4111条</strong>之间。从整体趋势看，数据增长呈现稳定上升态势，月均增长率约为8.5%，说明各类接入渠道运行稳定，市民诉求反映渠道畅通有效。</p>
        
        <p><strong>二、渠道分布特征分析</strong></p>
        <p>从9个接入渠道的数据占比来看：<strong>12345来电</strong>占比最高（约42.1%），累计数据量超过245万条，是主要的数据来源渠道，体现了传统热线服务的重要性；<strong>"两枣"网络端</strong>占比约15.3%，累计89万余条，反映了数字化转型的成效；<strong>市场主体</strong>相关数据占比约9.7%，累计56万余条，说明营商环境优化工作持续推进；<strong>110转接</strong>、<strong>市政府网站</strong>、<strong>省接诉即办</strong>等渠道数据占比分别为4.0%、5.9%和7.8%，形成了多渠道协同的数据收集体系。</p>
        
        <p><strong>三、响应效率与服务质量</strong></p>
        <p>各渠道平均响应时间差异明显："两枣"网络端响应最快（1.8分钟），12345来电次之（2.3分钟），市场主体渠道为3.1分钟。省级以上平台转办事项响应时间相对较长（6-12分钟），主要因其涉及流程审核和转办环节。从满意度指标看，省接诉即办满意度最高（95.1%），"两枣"网络端为96.2%，12345热线为94.5%，整体服务质量保持在较高水平。</p>
        
        <p><strong>四、数据融合价值与治理效能</strong></p>
        <p>通过多源数据融合，平台实现了数据资源的统一整合和智能分析，为精准治理提供了数据支撑。跨渠道数据比对发现，同一事项可能通过多个渠道反映，数据融合有效避免了重复统计，提高了治理效率。同时，通过对不同渠道数据特征的挖掘，能够识别市民偏好、问题热点区域和时段规律，为主动治理和预防性管理提供了科学依据。</p>
        
        <p><strong>五、优化建议</strong></p>
        <p>建议继续加强省级以上平台转办事项的响应速度，优化转办流程；进一步推广"两枣"网络端的使用，引导市民通过数字化渠道反映诉求；加强12345热线与其他渠道的数据协同，提升整体服务效能；建立数据质量监控机制，确保各渠道数据的准确性和完整性。</p>
    `;
    
    // 确保容器可见且已清空
    if (!container) return;
    
    container.innerHTML = '';
    container.style.opacity = '1';
    container.style.visibility = 'visible';
    
    // 将HTML文本分割成标签和文本段
    const htmlText = fullText.trim();
    const parts = [];
    let i = 0;
    
    while (i < htmlText.length) {
        if (htmlText[i] === '<') {
            // 提取HTML标签
            const tagEnd = htmlText.indexOf('>', i);
            if (tagEnd !== -1) {
                parts.push({
                    type: 'tag',
                    content: htmlText.substring(i, tagEnd + 1)
                });
                i = tagEnd + 1;
            } else {
                parts.push({ type: 'text', content: htmlText[i] });
                i++;
            }
        } else {
            // 提取文本字符
            parts.push({ type: 'text', content: htmlText[i] });
            i++;
        }
    }
    
    // 计算纯文本字符数
    const textChars = parts.filter(p => p.type === 'text').length;
    const totalDuration = 5000; // 5秒
    const charDelay = Math.max(20, totalDuration / textChars); // 每个字符的延迟时间，最小20ms
    
    // 批量更新，减少DOM操作频率
    let partIndex = 0;
    let currentHtml = '';
    const batchSize = 2; // 每次处理2个字符
    let pendingUpdate = false;
    
    const updateContent = () => {
        if (!pendingUpdate) {
            pendingUpdate = true;
            requestAnimationFrame(() => {
                container.innerHTML = currentHtml;
                pendingUpdate = false;
            });
        }
    };
    
    const displayNextPart = () => {
        if (partIndex >= parts.length) {
            // 确保最后的内容被更新
            if (currentHtml) {
                container.innerHTML = currentHtml;
            }
            return;
        }
        
        // 批量处理多个字符
        let batchCount = 0;
        while (partIndex < parts.length && batchCount < batchSize) {
            const part = parts[partIndex];
            currentHtml += part.content;
            partIndex++;
            
            // 标签不计数，文本字符计数
            if (part.type === 'text') {
                batchCount++;
            }
        }
        
        // 批量更新DOM
        updateContent();
        
        if (partIndex < parts.length) {
            setTimeout(displayNextPart, charDelay);
        }
    };
    
    // 开始显示
    displayNextPart();
}

// 民生善治指数模块 - 动态监测展现
function initGovernanceIndex() {
    // 一级指标点击事件
    const primaryIndicatorItems = document.querySelectorAll('.primary-indicator-item');
    primaryIndicatorItems.forEach(item => {
        item.addEventListener('click', function() {
            const indexType = this.getAttribute('data-index');
            openGovernanceIndexModal(indexType);
        });
    });
    
    // 善治指数弹窗关闭事件
    const closeGovernanceIndexModalBtn = document.getElementById('closeGovernanceIndexModal');
    const governanceIndexModal = document.getElementById('governanceIndexModal');
    const governanceIndexModalOverlay = governanceIndexModal ? governanceIndexModal.querySelector('.modal-overlay') : null;
    
    if (closeGovernanceIndexModalBtn) {
        closeGovernanceIndexModalBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            closeGovernanceIndexModal();
        });
    }
    
    if (governanceIndexModalOverlay) {
        governanceIndexModalOverlay.addEventListener('click', function(e) {
            e.stopPropagation();
            closeGovernanceIndexModal();
        });
    }
    
    // 阻止弹窗内容区域点击关闭
    const governanceIndexModalContent = governanceIndexModal ? governanceIndexModal.querySelector('.modal-content') : null;
    if (governanceIndexModalContent) {
        governanceIndexModalContent.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }
    
    // AI分析弹窗关闭事件
    const closeAiAnalysisModalBtn = document.getElementById('closeAiAnalysisModal');
    const aiAnalysisModal = document.getElementById('aiAnalysisModal');
    
    if (closeAiAnalysisModalBtn) {
        closeAiAnalysisModalBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            closeAIAnalysisModal();
        });
    }
    
    // 阻止AI分析弹窗内容区域点击关闭
    const aiAnalysisModalContent = aiAnalysisModal ? aiAnalysisModal.querySelector('.modal-content') : null;
    if (aiAnalysisModalContent) {
        aiAnalysisModalContent.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }
    
    // 初始化箭头状态
    updateIndicatorScores();
    
    // 每15秒更新一次分值
    setInterval(() => {
        updateIndicatorScores();
    }, 15000);
}

// 更新指标分值
function updateIndicatorScores() {
    const publicWelfareScore = document.getElementById('publicWelfareScore');
    const marketEntitiesScore = document.getElementById('marketEntitiesScore');
    
    if (publicWelfareScore) {
        // 生成新的分值（75-95之间）
        const currentScore = parseFloat(publicWelfareScore.textContent) || 85;
        const change = (Math.random() - 0.5) * 2; // -1到+1的变化
        const newScore = Math.max(75, Math.min(95, currentScore + change));
        const formattedScore = newScore.toFixed(1);
        
        // 判断是上升还是下降（用于颜色）
        const isUp = newScore > currentScore;
        
        // 更新分值
        publicWelfareScore.textContent = formattedScore;
        publicWelfareScore.className = 'indicator-score ' + (isUp ? 'up' : 'down');
        
        // 添加动画效果
        publicWelfareScore.classList.add('score-update');
        setTimeout(() => {
            publicWelfareScore.classList.remove('score-update');
        }, 500);
    }
    
    if (marketEntitiesScore) {
        const currentScore = parseFloat(marketEntitiesScore.textContent) || 82;
        const change = (Math.random() - 0.5) * 2;
        const newScore = Math.max(75, Math.min(95, currentScore + change));
        const formattedScore = newScore.toFixed(1);
        
        const isUp = newScore > currentScore;
        
        marketEntitiesScore.textContent = formattedScore;
        marketEntitiesScore.className = 'indicator-score ' + (isUp ? 'up' : 'down');
        
        marketEntitiesScore.classList.add('score-update');
        setTimeout(() => {
            marketEntitiesScore.classList.remove('score-update');
        }, 500);
    }
}

// 更新一级指标统计数据
function updatePrimaryIndicatorStats() {
    const publicWelfareTotal = document.getElementById('publicWelfareTotal');
    const marketEntitiesTotal = document.getElementById('marketEntitiesTotal');
    
    if (publicWelfareTotal) {
        const current = parseInt(publicWelfareTotal.textContent.replace(/,/g, '')) || 0;
        const newTotal = Math.floor(Math.random() * 50000 + 50000);
        animateNumber(publicWelfareTotal, current, newTotal, 1000);
    }
    
    if (marketEntitiesTotal) {
        const current = parseInt(marketEntitiesTotal.textContent.replace(/,/g, '')) || 0;
        const newTotal = Math.floor(Math.random() * 60000 + 60000);
        animateNumber(marketEntitiesTotal, current, newTotal, 1000);
    }
}

// 督办效果模块 - 图表展示
function initSupervisionEffect() {
    const chartDom = document.getElementById('supervisionChart');
    if (!chartDom) return;
    
    const myChart = echarts.init(chartDom);
    
    const option = {
        backgroundColor: 'transparent',
        grid: {
            left: '10%',
            right: '10%',
            top: '15%',
            bottom: '15%'
        },
        xAxis: {
            type: 'category',
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
            axisLine: {
                lineStyle: {
                    color: '#7db8e6'
                }
            },
            axisLabel: {
                color: '#8db8d8',
                fontSize: 10
            }
        },
        yAxis: {
            type: 'value',
            axisLine: {
                lineStyle: {
                    color: '#7db8e6'
                }
            },
            axisLabel: {
                color: '#8db8d8',
                fontSize: 10
            },
            splitLine: {
                lineStyle: {
                    color: 'rgba(100, 180, 255, 0.1)'
                }
            }
        },
        series: [{
            data: [120, 132, 101, 134, 90, 230, 210],
            type: 'line',
            smooth: true,
            areaStyle: {
                color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [{
                        offset: 0,
                        color: 'rgba(100, 180, 255, 0.3)'
                    }, {
                        offset: 1,
                        color: 'rgba(100, 180, 255, 0.05)'
                    }]
                }
            },
            lineStyle: {
                color: '#7db8e6',
                width: 2
            },
            itemStyle: {
                color: '#7db8e6'
            }
        }]
    };
    
    myChart.setOption(option);
    
    setInterval(() => {
        const newData = Array.from({ length: 7 }, () => 
            Math.floor(Math.random() * 150) + 80
        );
        option.series[0].data = newData;
        myChart.setOption(option);
        
        const total = newData.reduce((a, b) => a + b, 0);
        const completed = Math.floor(total * 0.93);
        const rate = ((completed / total) * 100).toFixed(1);
        
        const supervisionTotal = document.getElementById('supervisionTotal');
        const supervisionCompleted = document.getElementById('supervisionCompleted');
        const supervisionRate = document.getElementById('supervisionRate');
        
        if (supervisionTotal) supervisionTotal.textContent = total.toLocaleString();
        if (supervisionCompleted) supervisionCompleted.textContent = completed.toLocaleString();
        if (supervisionRate) supervisionRate.textContent = rate + '%';
    }, 5000);
    
    window.addEventListener('resize', () => {
        myChart.resize();
    });
    
    // 添加点击事件打开弹窗
    initSupervisionEffectModal();
}

// 督办效果弹窗
function initSupervisionEffectModal() {
    const module = document.getElementById('supervisionEffectModule');
    const modal = document.getElementById('supervisionEffectModal');
    const closeBtn = document.getElementById('closeSupervisionEffectModal');
    const overlay = modal?.querySelector('.modal-overlay');
    
    if (!module || !modal) return;
    
    // 点击模块打开弹窗
    module.style.cursor = 'pointer';
    module.addEventListener('click', function() {
        openSupervisionEffectModal();
    });
    
    // 关闭按钮
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            closeSupervisionEffectModal();
        });
    }
    
    // 点击遮罩层关闭
    if (overlay) {
        overlay.addEventListener('click', function() {
            closeSupervisionEffectModal();
        });
    }
    
    // ESC键关闭（统一管理，避免冲突）
    // 注意：ESC键关闭逻辑在页面底部统一处理
}

function openSupervisionEffectModal() {
    const modal = document.getElementById('supervisionEffectModal');
    if (!modal) return;
    
    // 更新弹窗数据
    updateSupervisionModalData();
    
    // 显示弹窗
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeSupervisionEffectModal() {
    const modal = document.getElementById('supervisionEffectModal');
    if (!modal) return;
    
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

function updateSupervisionModalData() {
    // 获取当前数据
    const total = parseInt(document.getElementById('supervisionTotal')?.textContent.replace(/,/g, '') || '1234');
    const completed = parseInt(document.getElementById('supervisionCompleted')?.textContent.replace(/,/g, '') || '1156');
    const rate = parseFloat(document.getElementById('supervisionRate')?.textContent.replace('%', '') || '93.7');
    
    const pending = total - completed;
    const onTimeRate = (rate * 0.95).toFixed(1); // 按时完成率
    const overdueRate = (rate - onTimeRate).toFixed(1); // 超期完成率
    const avgTime = (2.0 + Math.random() * 0.6).toFixed(1); // 平均处理时长
    
    // 更新统计数据
    const modalTotal = document.getElementById('modalSupervisionTotal');
    const modalCompleted = document.getElementById('modalSupervisionCompleted');
    const modalPending = document.getElementById('modalSupervisionPending');
    const modalRate = document.getElementById('modalSupervisionRate');
    const modalOnTimeRate = document.getElementById('modalOnTimeRate');
    const modalOverdueRate = document.getElementById('modalOverdueRate');
    const modalAvgTime = document.getElementById('modalAvgTime');
    
    if (modalTotal) modalTotal.textContent = total.toLocaleString();
    if (modalCompleted) modalCompleted.textContent = completed.toLocaleString();
    if (modalPending) modalPending.textContent = pending.toLocaleString();
    if (modalRate) modalRate.textContent = rate + '%';
    if (modalOnTimeRate) modalOnTimeRate.textContent = onTimeRate + '%';
    if (modalOverdueRate) modalOverdueRate.textContent = overdueRate + '%';
    if (modalAvgTime) modalAvgTime.textContent = avgTime + '天';
    
    // 生成AI分析
    generateSupervisionAIAnalysis(total, completed, rate, pending);
}

function generateSupervisionAIAnalysis(total, completed, rate, pending) {
    const generatingElement = document.getElementById('supervisionAIGenerating');
    const analysisTextElement = document.getElementById('supervisionAIAnalysisText');
    
    if (!generatingElement || !analysisTextElement) return;
    
    // 显示生成中状态
    generatingElement.style.display = 'flex';
    analysisTextElement.style.display = 'none';
    analysisTextElement.innerHTML = '';
    
    const fullText = `根据督办效果数据分析，当前督办事项总数为${total.toLocaleString()}件，已完成${completed.toLocaleString()}件，完成率达到${rate}%，整体督办机制运行良好。待处理事项${pending}件，主要集中在环境治理、基础设施维护、公共服务等领域。从完成率趋势来看，督办工作取得了显著成效，大部分事项都能在规定时间内完成。建议继续加强待处理事项的跟踪督办，建立预警机制提前识别可能超期的事项，优化督办流程提升处理效率，同时加强跨部门协调，确保复杂事项得到及时解决。`;
    
    // 延迟1秒后开始逐字显示
    setTimeout(() => {
        typeWriterEffect(analysisTextElement, fullText, generatingElement);
    }, 1000);
}

// 主动治理成效弹窗
function initGovernanceEffectivenessModal() {
    const modal = document.getElementById('governanceEffectivenessModal');
    const closeBtn = document.getElementById('closeGovernanceEffectivenessModal');
    const overlay = modal?.querySelector('.modal-overlay');
    
    if (!modal) return;
    
    // 关闭按钮
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            closeGovernanceEffectivenessModal();
        });
    }
    
    // 点击遮罩层关闭
    if (overlay) {
        overlay.addEventListener('click', function() {
            closeGovernanceEffectivenessModal();
        });
    }
    
    // ESC键关闭（统一管理，避免冲突）
    // 注意：ESC键关闭逻辑在页面底部统一处理
}

function openGovernanceEffectivenessModal(data) {
    const modal = document.getElementById('governanceEffectivenessModal');
    if (!modal) return;
    
    // 更新弹窗数据
    updateGovernanceEffectivenessModalData(data);
    
    // 显示弹窗
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeGovernanceEffectivenessModal() {
    const modal = document.getElementById('governanceEffectivenessModal');
    if (!modal) return;
    
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

function updateGovernanceEffectivenessModalData(data) {
    // 更新标题
    const title = document.getElementById('effectivenessModalTitle');
    if (title) {
        title.textContent = `${data.district} - ${data.street} 主动治理成效`;
    }
    
    // 更新详细统计数据
    const detailTotalBefore = document.getElementById('detailTotalBefore');
    const detailTotalAfter = document.getElementById('detailTotalAfter');
    const detailTotalChange = document.getElementById('detailTotalChange');
    
    const detailDifficultBefore = document.getElementById('detailDifficultBefore');
    const detailDifficultAfter = document.getElementById('detailDifficultAfter');
    const detailDifficultChange = document.getElementById('detailDifficultChange');
    
    const detailHighFreqBefore = document.getElementById('detailHighFreqBefore');
    const detailHighFreqAfter = document.getElementById('detailHighFreqAfter');
    const detailHighFreqChange = document.getElementById('detailHighFreqChange');
    
    if (detailTotalBefore) detailTotalBefore.textContent = data.totalRequests.before + '件';
    if (detailTotalAfter) detailTotalAfter.textContent = data.totalRequests.after + '件';
    if (detailTotalChange) {
        detailTotalChange.textContent = (data.totalRequests.change > 0 ? '+' : '') + data.totalRequests.change.toFixed(1) + '%';
        detailTotalChange.className = 'detail-change ' + (data.totalRequests.change < 0 ? 'down' : 'up');
    }
    
    if (detailDifficultBefore) detailDifficultBefore.textContent = data.difficultRequests.before + '件';
    if (detailDifficultAfter) detailDifficultAfter.textContent = data.difficultRequests.after + '件';
    if (detailDifficultChange) {
        detailDifficultChange.textContent = (data.difficultRequests.change > 0 ? '+' : '') + data.difficultRequests.change.toFixed(1) + '%';
        detailDifficultChange.className = 'detail-change ' + (data.difficultRequests.change < 0 ? 'down' : 'up');
    }
    
    if (detailHighFreqBefore) detailHighFreqBefore.textContent = data.highFrequencyRequests.before + '件';
    if (detailHighFreqAfter) detailHighFreqAfter.textContent = data.highFrequencyRequests.after + '件';
    if (detailHighFreqChange) {
        detailHighFreqChange.textContent = (data.highFrequencyRequests.change > 0 ? '+' : '') + data.highFrequencyRequests.change.toFixed(1) + '%';
        detailHighFreqChange.className = 'detail-change ' + (data.highFrequencyRequests.change < 0 ? 'down' : 'up');
    }
    
    // 生成AI分析
    generateGovernanceEffectivenessAIAnalysis(data);
}

function generateGovernanceEffectivenessAIAnalysis(data) {
    const generatingElement = document.getElementById('effectivenessAIGenerating');
    const analysisTextElement = document.getElementById('effectivenessAIAnalysisText');
    
    if (!generatingElement || !analysisTextElement) return;
    
    // 显示生成中状态
    generatingElement.style.display = 'flex';
    analysisTextElement.style.display = 'none';
    analysisTextElement.innerHTML = '';
    
    const totalReduction = data.totalRequests.before - data.totalRequests.after;
    const difficultReduction = data.difficultRequests.before - data.difficultRequests.after;
    const highFreqReduction = data.highFrequencyRequests.before - data.highFrequencyRequests.after;
    
    const fullText = `根据${data.district}${data.street}的主动治理成效数据分析，该区域通过建立主动发现和预防性治理机制，取得了显著成效。总体诉求从${data.totalRequests.before}件降至${data.totalRequests.after}件，减少${totalReduction}件，降幅达${Math.abs(data.totalRequests.change).toFixed(1)}%，说明主动治理在源头预防方面发挥了重要作用。疑难诉求从${data.difficultRequests.before}件降至${data.difficultRequests.after}件，减少${difficultReduction}件，降幅${Math.abs(data.difficultRequests.change).toFixed(1)}%，表明主动治理在解决复杂问题方面效果突出。高频诉求从${data.highFrequencyRequests.before}件降至${data.highFrequencyRequests.after}件，减少${highFreqReduction}件，降幅${Math.abs(data.highFrequencyRequests.change).toFixed(1)}%，说明通过提前介入和预防性措施，有效减少了重复性诉求的产生。建议继续保持主动发现和预防性治理机制，总结成功经验推广到其他区域，重点关注剩余疑难诉求制定专项解决方案，建立长效机制确保治理成效持续提升。`;
    
    // 延迟1秒后开始逐字显示
    setTimeout(() => {
        typeWriterEffect(analysisTextElement, fullText, generatingElement);
    }, 1000);
}

// 关注人群高频诉求弹窗
function initPopulationRequestModal() {
    const modal = document.getElementById('populationRequestModal');
    const closeBtn = document.getElementById('closePopulationRequestModal');
    const overlay = modal?.querySelector('.modal-overlay');
    
    if (!modal) return;
    
    // 关闭按钮
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            closePopulationRequestModal();
        });
    }
    
    // 点击遮罩层关闭
    if (overlay) {
        overlay.addEventListener('click', function() {
            closePopulationRequestModal();
        });
    }
    
    // ESC键关闭（统一管理，避免冲突）
    // 注意：ESC键关闭逻辑在页面底部统一处理
}

function openPopulationRequestModal(data) {
    const modal = document.getElementById('populationRequestModal');
    if (!modal) return;
    
    // 更新弹窗数据
    updatePopulationRequestModalData(data);
    
    // 显示弹窗
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closePopulationRequestModal() {
    const modal = document.getElementById('populationRequestModal');
    if (!modal) return;
    
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

function updatePopulationRequestModalData(data) {
    // 更新标题
    const title = document.getElementById('populationRequestModalTitle');
    if (title) {
        title.textContent = `${data.population} - ${data.request.type} 诉求详情`;
    }
    
    // 更新详细统计数据
    const detailPopulationName = document.getElementById('detailPopulationName');
    const detailPopulationDesc = document.getElementById('detailPopulationDesc');
    const detailRequestType = document.getElementById('detailRequestType');
    const detailRequestCount = document.getElementById('detailRequestCount');
    const detailRequestPercentage = document.getElementById('detailRequestPercentage');
    const detailRequestTrend = document.getElementById('detailRequestTrend');
    
    if (detailPopulationName) detailPopulationName.textContent = data.population;
    if (detailPopulationDesc) {
        // 根据人群类型设置描述
        const descMap = {
            '新市民劳动者': '城市新融入群体，需要基础保障服务',
            '新就业群体': '刚进入职场的年轻人，需要职业发展支持',
            '青年群体': '18-35岁青年，关注就业创业机会',
            '困境群体': '生活困难群体，需要基本生活保障',
            '特殊群体': '需要特殊关爱和康复服务的人群',
            '重点人员': '需要重点关注和帮教服务',
            '农民工': '外来务工人员，关注权益保障',
            '职业投诉人': '经常性投诉人群，需要专业引导'
        };
        detailPopulationDesc.textContent = descMap[data.population] || '重点关注人群';
    }
    
    if (detailRequestType) detailRequestType.textContent = data.request.type;
    if (detailRequestCount) detailRequestCount.textContent = data.request.count.toLocaleString() + '件';
    
    // 计算诉求占比（模拟数据）
    const totalRequests = 65000; // 假设总诉求数
    const percentage = ((data.request.count / totalRequests) * 100).toFixed(1);
    if (detailRequestPercentage) detailRequestPercentage.textContent = percentage + '%';
    
    // 计算趋势（模拟数据）
    const trend = (Math.random() * 6 - 3).toFixed(1); // -3% 到 +3%
    const trendSymbol = parseFloat(trend) >= 0 ? '↑' : '↓';
    if (detailRequestTrend) {
        detailRequestTrend.textContent = `较上月 ${trendSymbol} ${Math.abs(parseFloat(trend)).toFixed(1)}%`;
        detailRequestTrend.className = 'request-trend ' + (parseFloat(trend) >= 0 ? 'up' : 'down');
    }
    
    // 生成AI分析
    generatePopulationRequestAIAnalysis(data, percentage, trend);
}

function generatePopulationRequestAIAnalysis(data, percentage, trend) {
    const generatingElement = document.getElementById('populationRequestAIGenerating');
    const analysisTextElement = document.getElementById('populationRequestAIAnalysisText');
    
    if (!generatingElement || !analysisTextElement) return;
    
    // 显示生成中状态
    generatingElement.style.display = 'flex';
    analysisTextElement.style.display = 'none';
    analysisTextElement.innerHTML = '';
    
    const trendText = parseFloat(trend) >= 0 ? '上升' : '下降';
    const trendValue = Math.abs(parseFloat(trend));
    
    const fullText = `根据${data.population}的高频诉求数据分析，该人群的高频诉求为${data.request.type}，诉求数量为${data.request.count.toLocaleString()}件，占该人群总诉求的${percentage}%，是当前最需要关注的诉求类型。与上月相比，诉求数量${trendText}${trendValue}%，${parseFloat(trend) >= 0 ? '需要重点关注并采取应对措施，分析诉求增长的原因，制定针对性的解决方案' : '说明治理措施取得一定成效，但需要继续保持并优化服务机制'}。从诉求特征来看，${data.population}对${data.request.type}的需求较为集中，建议针对该诉求类型建立专项服务机制，加强与${data.population}的沟通了解具体需求，完善相关政策措施提升服务质量和效率，建立预警机制提前识别潜在诉求，同时加强跨部门协调，确保诉求得到及时有效解决。`;
    
    // 延迟1秒后开始逐字显示
    setTimeout(() => {
        typeWriterEffect(analysisTextElement, fullText, generatingElement);
    }, 1000);
}

// 主动治理成效模块
function initActiveGovernance() {
    const container = document.getElementById('governanceEffectivenessList');
    if (!container) return;
    
    // 定义街镇一级的主动治理成效数据
    const effectivenessData = [
        {
            street: '建设路街道',
            district: '市中区',
            totalRequests: { before: 156, after: 98, change: -37.2 },
            difficultRequests: { before: 23, after: 12, change: -47.8 },
            highFrequencyRequests: { before: 45, after: 18, change: -60.0 }
        },
        {
            street: '临城街道',
            district: '薛城区',
            totalRequests: { before: 134, after: 89, change: -33.6 },
            difficultRequests: { before: 18, after: 9, change: -50.0 },
            highFrequencyRequests: { before: 38, after: 15, change: -60.5 }
        },
        {
            street: '坛山街道',
            district: '峄城区',
            totalRequests: { before: 112, after: 76, change: -32.1 },
            difficultRequests: { before: 15, after: 8, change: -46.7 },
            highFrequencyRequests: { before: 32, after: 13, change: -59.4 }
        },
        {
            street: '运河街道',
            district: '台儿庄区',
            totalRequests: { before: 98, after: 65, change: -33.7 },
            difficultRequests: { before: 12, after: 6, change: -50.0 },
            highFrequencyRequests: { before: 28, after: 11, change: -60.7 }
        },
        {
            street: '山城街道',
            district: '山亭区',
            totalRequests: { before: 87, after: 58, change: -33.3 },
            difficultRequests: { before: 10, after: 5, change: -50.0 },
            highFrequencyRequests: { before: 25, after: 10, change: -60.0 }
        },
        {
            street: '龙泉街道',
            district: '滕州市',
            totalRequests: { before: 178, after: 112, change: -37.1 },
            difficultRequests: { before: 28, after: 14, change: -50.0 },
            highFrequencyRequests: { before: 52, after: 21, change: -59.6 }
        }
    ];
    
    // 生成HTML - 垂直排列，向下慢速滚动
    let html = '<div class="governance-effectiveness-scroll-wrapper">';
    html += '<div class="governance-effectiveness-scroll-content">';
    // 复制一次数据以实现无缝循环滚动
    const doubledData = [...effectivenessData, ...effectivenessData];
    doubledData.forEach((item, index) => {
        // 将数据编码为JSON字符串存储在data属性中
        const itemData = encodeURIComponent(JSON.stringify(item));
        html += `<div class="effectiveness-item" data-item="${itemData}" style="cursor: pointer;">
            <div class="effectiveness-header">
                <div class="effectiveness-location">
                    <span class="effectiveness-district">${item.district}</span>
                    <span class="effectiveness-street">${item.street}</span>
                </div>
            </div>
            <div class="effectiveness-stats">
                <div class="effectiveness-stat-item">
                    <div class="stat-label">总体诉求</div>
                    <div class="stat-values">
                        <span class="stat-before">${item.totalRequests.before}件</span>
                        <span class="stat-arrow">→</span>
                        <span class="stat-after">${item.totalRequests.after}件</span>
                    </div>
                    <div class="stat-change ${item.totalRequests.change < 0 ? 'down' : 'up'}">
                        ${item.totalRequests.change > 0 ? '+' : ''}${item.totalRequests.change.toFixed(1)}%
                    </div>
                </div>
                <div class="effectiveness-stat-item">
                    <div class="stat-label">疑难诉求</div>
                    <div class="stat-values">
                        <span class="stat-before">${item.difficultRequests.before}件</span>
                        <span class="stat-arrow">→</span>
                        <span class="stat-after">${item.difficultRequests.after}件</span>
                    </div>
                    <div class="stat-change ${item.difficultRequests.change < 0 ? 'down' : 'up'}">
                        ${item.difficultRequests.change > 0 ? '+' : ''}${item.difficultRequests.change.toFixed(1)}%
                    </div>
                </div>
                <div class="effectiveness-stat-item">
                    <div class="stat-label">高频诉求</div>
                    <div class="stat-values">
                        <span class="stat-before">${item.highFrequencyRequests.before}件</span>
                        <span class="stat-arrow">→</span>
                        <span class="stat-after">${item.highFrequencyRequests.after}件</span>
                    </div>
                    <div class="stat-change ${item.highFrequencyRequests.change < 0 ? 'down' : 'up'}">
                        ${item.highFrequencyRequests.change > 0 ? '+' : ''}${item.highFrequencyRequests.change.toFixed(1)}%
                    </div>
                </div>
            </div>
        </div>`;
    });
    
    html += '</div>'; // 关闭 scroll-content
    html += '</div>'; // 关闭 scroll-wrapper
    
    container.innerHTML = html;
    
    // 为每个effectiveness-item添加点击事件
    const items = container.querySelectorAll('.effectiveness-item');
    items.forEach(item => {
        item.addEventListener('click', function() {
            const itemData = this.getAttribute('data-item');
            if (itemData) {
                try {
                    const data = JSON.parse(decodeURIComponent(itemData));
                    openGovernanceEffectivenessModal(data);
                } catch (e) {
                    console.error('解析数据失败:', e);
                }
            }
        });
    });
    
    // 初始化弹窗
    initGovernanceEffectivenessModal();
    
    // 定期更新数据（每30秒）
    setInterval(() => {
        effectivenessData.forEach((item) => {
            // 在现有基础上小幅度波动
            const change = (Math.random() - 0.5) * 2; // -1到+1的变化
            
            item.totalRequests.after = Math.max(50, Math.min(150, item.totalRequests.after + change));
            item.totalRequests.change = ((item.totalRequests.after - item.totalRequests.before) / item.totalRequests.before * 100);
            
            item.difficultRequests.after = Math.max(5, Math.min(25, item.difficultRequests.after + (change * 0.3)));
            item.difficultRequests.change = ((item.difficultRequests.after - item.difficultRequests.before) / item.difficultRequests.before * 100);
            
            item.highFrequencyRequests.after = Math.max(10, Math.min(55, item.highFrequencyRequests.after + (change * 0.5)));
            item.highFrequencyRequests.change = ((item.highFrequencyRequests.after - item.highFrequencyRequests.before) / item.highFrequencyRequests.before * 100);
        });
        
        // 更新显示
        updateEffectivenessDisplay();
    }, 30000);
    
    // 更新显示函数
    function updateEffectivenessDisplay() {
        const scrollWrapper = container.querySelector('.governance-effectiveness-scroll-wrapper');
        if (!scrollWrapper) return;
        
        effectivenessData.forEach((item, index) => {
            const itemElement = scrollWrapper.children[index];
            if (!itemElement) return;
            
            updateItemDisplay(itemElement, item);
        });
    }
    
    // 更新单个item的显示
    function updateItemDisplay(itemElement, item) {
        if (!itemElement) return;
            
            const statItems = itemElement.querySelectorAll('.effectiveness-stat-item');
            
            // 更新总体诉求
            if (statItems[0]) {
                const afterElement = statItems[0].querySelector('.stat-after');
                const changeElement = statItems[0].querySelector('.stat-change');
                if (afterElement) afterElement.textContent = Math.round(item.totalRequests.after) + '件';
                if (changeElement) {
                    changeElement.textContent = (item.totalRequests.change > 0 ? '+' : '') + item.totalRequests.change.toFixed(1) + '%';
                    changeElement.className = 'stat-change ' + (item.totalRequests.change < 0 ? 'down' : 'up');
                }
            }
            
            // 更新疑难诉求
            if (statItems[1]) {
                const afterElement = statItems[1].querySelector('.stat-after');
                const changeElement = statItems[1].querySelector('.stat-change');
                if (afterElement) afterElement.textContent = Math.round(item.difficultRequests.after) + '件';
                if (changeElement) {
                    changeElement.textContent = (item.difficultRequests.change > 0 ? '+' : '') + item.difficultRequests.change.toFixed(1) + '%';
                    changeElement.className = 'stat-change ' + (item.difficultRequests.change < 0 ? 'down' : 'up');
                }
            }
            
            // 更新高频诉求
            if (statItems[2]) {
                const afterElement = statItems[2].querySelector('.stat-after');
                const changeElement = statItems[2].querySelector('.stat-change');
                if (afterElement) afterElement.textContent = Math.round(item.highFrequencyRequests.after) + '件';
                if (changeElement) {
                    changeElement.textContent = (item.highFrequencyRequests.change > 0 ? '+' : '') + item.highFrequencyRequests.change.toFixed(1) + '%';
                    changeElement.className = 'stat-change ' + (item.highFrequencyRequests.change < 0 ? 'down' : 'up');
                }
            }
    }
}

// 治理挑战指数弹窗
function initChallengeIndexModal() {
    const modal = document.getElementById('challengeIndexModal');
    const closeBtn = document.getElementById('closeChallengeIndexModal');
    const overlay = modal?.querySelector('.modal-overlay');
    
    if (!modal) return;
    
    // 关闭按钮
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            closeChallengeIndexModal();
        });
    }
    
    // 点击遮罩层关闭
    if (overlay) {
        overlay.addEventListener('click', function() {
            closeChallengeIndexModal();
        });
    }
    
    // ESC键关闭（统一管理，避免冲突）
    // 注意：ESC键关闭逻辑在页面底部统一处理
}

function openChallengeIndexModal(data) {
    const modal = document.getElementById('challengeIndexModal');
    if (!modal) return;
    
    // 更新弹窗数据
    updateChallengeIndexModalData(data);
    
    // 显示弹窗
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeChallengeIndexModal() {
    const modal = document.getElementById('challengeIndexModal');
    if (!modal) return;
    
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

function updateChallengeIndexModalData(data) {
    // 更新标题
    const title = document.getElementById('challengeIndexModalTitle');
    if (title) {
        title.textContent = `${data.area} - ${data.title} 治理挑战指数详情`;
    }
    
    // 生成AI分析
    generateChallengeIndexAIAnalysis(data);
    
    // 生成治理建议
    generateChallengeSuggestions(data);
    
    // 显示分值构成
    displayChallengeScoreBreakdown(data);
}

function generateChallengeIndexAIAnalysis(data) {
    const generatingElement = document.getElementById('challengeIndexAIGenerating');
    const analysisTextElement = document.getElementById('challengeIndexAIAnalysisText');
    
    if (!generatingElement || !analysisTextElement) return;
    
    // 显示生成中状态
    generatingElement.style.display = 'flex';
    analysisTextElement.style.display = 'none';
    analysisTextElement.innerHTML = '';
    
    const totalScore = data.value;
    const dims = data.dimensions;
    
    // 分析各维度
    const highDimensions = [];
    const lowDimensions = [];
    
    if (dims.requestCount > 700) highDimensions.push('诉求次数');
    else if (dims.requestCount < 400) lowDimensions.push('诉求次数');
    
    if (dims.emotionScore > 8.5) highDimensions.push('诉求情绪分值');
    else if (dims.emotionScore < 7.0) lowDimensions.push('诉求情绪分值');
    
    if (dims.collaboration > 8.0) highDimensions.push('协同办理关联度');
    else if (dims.collaboration < 7.0) lowDimensions.push('协同办理关联度');
    
    if (dims.cyclePrediction > 8.5) highDimensions.push('处置周期预测');
    else if (dims.cyclePrediction < 7.0) lowDimensions.push('处置周期预测');
    
    let fullText = `根据${data.area}${data.title}的治理挑战指数分析，该事项综合挑战指数为${totalScore}分（满分10分），属于${totalScore >= 8.5 ? '高' : totalScore >= 7.0 ? '中' : '低'}等挑战级别。从五个维度来看，诉求次数为${dims.requestCount}次，${dims.requestCount > 700 ? '诉求量较大需要重点关注，可能存在系统性问题需要深入分析' : dims.requestCount < 400 ? '诉求量相对较少，但需要保持关注' : '诉求量处于中等水平，需要持续监控'}。诉求来源统计为${dims.requestSource}分，${dims.requestSource > 8.0 ? '来源渠道多样涉及面广，说明问题影响范围较大，需要统筹协调' : '来源相对集中，可以针对性地制定解决方案'}。诉求情绪分值为${dims.emotionScore}分，${dims.emotionScore > 8.5 ? '情绪较为激烈需要及时响应，建议建立快速响应机制，加强沟通疏导' : '情绪相对平稳，但仍需保持关注'}。协同办理关联度为${dims.collaboration}分，${dims.collaboration > 8.0 ? '需要多部门协同处理，建议建立跨部门协调机制，明确责任分工' : '可独立或少量部门处理，但需要确保处理质量'}。处置周期预测为${dims.cyclePrediction}分，${dims.cyclePrediction > 8.5 ? '预计处理周期较长，需要提前规划资源，优化处理流程' : '预计处理周期较短，但仍需确保处理质量'}。`;
    
    if (highDimensions.length > 0) {
        fullText += `重点关注维度：${highDimensions.join('、')}得分较高，需要优先处理，建议制定专项治理方案。`;
    }
    if (lowDimensions.length > 0) {
        fullText += `优势维度：${lowDimensions.join('、')}得分较低，可作为治理优势，继续保持并总结经验。`;
    }
    
    // 延迟1秒后开始逐字显示
    setTimeout(() => {
        typeWriterEffect(analysisTextElement, fullText, generatingElement);
    }, 1000);
}

function generateChallengeSuggestions(data) {
    const suggestionsContainer = document.getElementById('challengeSuggestions');
    if (!suggestionsContainer) return;
    
    const dims = data.dimensions;
    const totalScore = data.value;
    const area = data.area;
    const title = data.title;
    const suggestions = [];
    
    // 根据各维度情况生成详细的治理建议
    if (dims.requestCount > 700) {
        suggestions.push({
            title: '建立快速响应与分流机制',
            content: `针对${area}${title}事项诉求量较大（${dims.requestCount}次）的情况，建议建立"1小时内响应、24小时内分流、72小时内反馈"的快速响应机制。设立专门的热线接听团队，对紧急诉求实行"绿色通道"优先处理。同时建立诉求分类分级制度，按照紧急程度和影响范围进行分级处理，确保重要诉求得到及时响应。建立诉求积压预警机制，当积压量超过阈值时自动启动应急响应预案，调配额外资源进行处理。`
        });
    } else if (dims.requestCount > 400) {
        suggestions.push({
            title: '优化诉求处理流程',
            content: `当前${area}${title}事项诉求量为${dims.requestCount}次，处于中等水平。建议优化现有处理流程，建立标准化操作手册，明确各环节处理时限和质量标准。引入智能化分派系统，根据诉求类型、区域、紧急程度自动分派至最合适的处理部门，减少人工分派时间。建立处理进度实时跟踪系统，让诉求人能够随时了解处理进展，提升透明度和满意度。`
        });
    }
    
    if (dims.emotionScore > 8.5) {
        suggestions.push({
            title: '加强情绪疏导与沟通机制',
            content: `诉求情绪分值达到${dims.emotionScore}分，表明群众情绪较为激烈，需要高度重视。建议建立"首接负责制"，确保诉求人能够找到固定的联系人，避免重复沟通。设立专门的沟通疏导团队，由经验丰富的工作人员负责与情绪激动的诉求人进行耐心沟通，了解真实诉求和关切点。建立"回访+安抚"机制，在处理过程中定期回访诉求人，及时反馈处理进展，缓解焦虑情绪。对于涉及面广、影响大的诉求，建议由相关负责人直接与诉求人面对面沟通，体现重视程度。同时建立情绪预警机制，对情绪分值持续较高的诉求类型进行重点关注和提前介入。`
        });
    } else if (dims.emotionScore > 7.5) {
        suggestions.push({
            title: '建立主动沟通机制',
            content: `诉求情绪分值为${dims.emotionScore}分，需要保持关注。建议建立主动沟通机制，在处理诉求前主动联系诉求人，了解详细情况和具体需求。设立满意度回访制度，处理完成后及时回访，收集反馈意见，对不满意的情况进行二次处理。建立常见问题解答库，提前准备标准化的解答方案，提高沟通效率。`
        });
    }
    
    if (dims.collaboration > 8.0) {
        suggestions.push({
            title: '构建跨部门协同治理体系',
            content: `协同办理关联度达到${dims.collaboration}分，说明${area}${title}事项涉及多个部门，需要建立完善的协同机制。建议成立专项工作小组，由分管领导担任组长，相关职能部门负责人为成员，定期召开协调会议，研究解决跨部门问题。建立"一事一议"制度，对复杂事项实行专题研究，明确牵头部门和配合部门，制定详细的协同方案和时间表。建立信息共享平台，各部门实时共享相关数据和信息，避免信息孤岛。设立协同办理"绿色通道"，对需要多部门协同的事项优先处理，缩短流转时间。建立协同办理考核机制，将协同配合情况纳入部门绩效考核，确保各部门主动配合。同时建立争议解决机制，当部门间出现责任不清或意见分歧时，由工作小组及时协调解决。`
        });
    }
    
    if (dims.cyclePrediction > 8.5) {
        suggestions.push({
            title: '优化处置流程缩短处理周期',
            content: `处置周期预测为${dims.cyclePrediction}分，预计处理周期较长。建议对现有处理流程进行全面梳理，识别瓶颈环节和冗余步骤，进行流程再造。建立"并联处理"机制，对于可以并行处理的环节同时进行，而不是串行等待。引入"容缺受理"制度，对于非关键材料缺失的情况，允许先受理后补交，避免因材料问题延误处理。建立"限时办结"制度，对每个处理环节设定明确的时限要求，超时自动预警。设立快速处理通道，对简单事项实行"即来即办"，复杂事项实行"承诺办结"。同时建立处理进度实时监控系统，对即将超时的事项提前预警，及时调配资源。建立处理周期分析机制，定期分析各类事项的处理周期，找出规律，优化流程。`
        });
    } else if (dims.cyclePrediction > 7.5) {
        suggestions.push({
            title: '提升处理效率',
            content: `处置周期预测为${dims.cyclePrediction}分，需要持续优化。建议建立标准化处理模板，对常见类型的事项制定标准化的处理流程和时限要求。引入电子化审批系统，减少纸质流转时间。建立处理进度提醒机制，对即将到期的事项提前提醒处理人员。`
        });
    }
    
    if (dims.requestSource > 8.0) {
        suggestions.push({
            title: '整合多渠道诉求统一管理',
            content: `诉求来源统计为${dims.requestSource}分，说明诉求来源渠道多样，涉及面广。建议建立统一的诉求管理平台，整合12345热线、网络平台、信访、现场投诉等所有渠道的诉求，实现"一平台受理、统一分派、统一跟踪、统一反馈"。建立诉求去重机制，通过技术手段识别重复诉求，避免重复处理。建立诉求关联分析系统，识别同一问题在不同渠道的反映，进行统一处理。设立专门的诉求分析团队，定期分析各渠道诉求的特点和趋势，为决策提供参考。同时建立渠道间信息共享机制，确保各渠道能够及时获取处理结果，避免信息不一致。`
        });
    }
    
    // 根据综合挑战指数生成总体建议
    if (totalScore >= 8.5) {
        suggestions.push({
            title: '建立综合治理长效机制',
            content: `综合挑战指数为${totalScore}分，属于高等挑战级别，需要建立综合治理长效机制。建议成立专项治理工作领导小组，由主要领导担任组长，统筹协调各方资源。制定详细的治理方案，明确治理目标、措施、时限和责任部门。建立"周调度、月总结、季评估"的工作机制，定期跟踪治理进展，及时调整策略。设立专项治理资金，保障治理工作所需的人力、物力、财力。建立治理效果评估机制，定期评估治理成效，对效果不佳的措施及时调整。同时建立经验总结和推广机制，将成功的治理经验总结提炼，推广到其他类似事项。建立预警机制，通过数据分析提前识别可能出现的风险点，采取预防措施。建立群众参与机制，广泛听取群众意见和建议，让治理工作更加贴近实际、符合民意。`
        });
    } else if (totalScore >= 7.0) {
        suggestions.push({
            title: '持续优化治理措施',
            content: `综合挑战指数为${totalScore}分，属于中等挑战级别。建议建立定期评估机制，每季度对治理效果进行评估，分析存在的问题和不足。建立持续改进机制，根据评估结果不断优化治理措施。加强数据分析和预测，通过历史数据分析找出规律，提前识别潜在问题。建立经验交流机制，与其他地区或部门交流治理经验，学习先进做法。同时建立激励机制，对治理成效显著的部门和个人给予表彰奖励，激发工作积极性。`
        });
    } else {
        suggestions.push({
            title: '保持治理优势总结经验',
            content: `综合挑战指数为${totalScore}分，属于低等挑战级别，治理效果良好。建议继续保持现有治理措施，总结成功经验。建立经验固化机制，将有效的治理措施制度化、规范化。建立经验推广机制，将成功经验推广到其他类似事项。同时保持警惕，建立监测机制，防止问题反弹。`
        });
    }
    
    // 通用建议
    suggestions.push({
        title: '建立数据驱动的治理决策机制',
        content: `建议建立完善的数据收集和分析体系，定期收集${area}${title}事项的相关数据，包括诉求数量、类型分布、处理周期、满意度等。运用大数据分析技术，识别诉求的规律和趋势，预测可能出现的风险点。建立数据可视化系统，通过图表、地图等形式直观展示数据，为决策提供参考。建立数据共享机制，各部门共享相关数据，避免数据孤岛。同时建立数据质量保障机制，确保数据的准确性和及时性。定期发布数据分析报告，为治理工作提供科学依据。`
    });
    
    suggestions.push({
        title: '加强队伍建设与能力提升',
        content: `建议加强治理队伍建设，定期组织业务培训，提升工作人员的专业能力和服务水平。建立"传帮带"机制，由经验丰富的老同志指导新同志，传承好的工作方法和经验。建立学习交流机制，组织工作人员到先进地区学习考察，开阔视野，学习先进经验。建立激励机制，对表现突出的工作人员给予表彰奖励，激发工作积极性。同时建立容错纠错机制，鼓励工作人员大胆创新，对因创新出现的失误给予宽容。建立定期轮岗机制，让工作人员在不同岗位锻炼，提升综合能力。`
    });
    
    const suggestionsHtml = `
        <div class="suggestions-list">
            ${suggestions.map((suggestion, index) => `
                <div class="suggestion-item">
                    <div class="suggestion-header">
                        <span class="suggestion-number">${index + 1}</span>
                        <span class="suggestion-title">${suggestion.title}</span>
                    </div>
                    <div class="suggestion-content">${suggestion.content}</div>
                </div>
            `).join('')}
        </div>
    `;
    
    suggestionsContainer.innerHTML = suggestionsHtml;
}

function displayChallengeScoreBreakdown(data) {
    const breakdownContainer = document.getElementById('challengeScoreBreakdown');
    if (!breakdownContainer) return;
    
    const dims = data.dimensions;
    const totalScore = data.value;
    
    // 计算每个维度的贡献值（标准化后的值）
    const normalized = {
        requestCount: Math.min(10, (dims.requestCount / 1000) * 10),
        requestSource: dims.requestSource,
        emotionScore: dims.emotionScore,
        collaboration: dims.collaboration,
        cyclePrediction: dims.cyclePrediction
    };
    
    // 权重
    const weights = {
        requestCount: 0.25,
        requestSource: 0.20,
        emotionScore: 0.20,
        collaboration: 0.20,
        cyclePrediction: 0.15
    };
    
    // 计算每个维度的加权贡献
    const contributions = {
        requestCount: normalized.requestCount * weights.requestCount,
        requestSource: normalized.requestSource * weights.requestSource,
        emotionScore: normalized.emotionScore * weights.emotionScore,
        collaboration: normalized.collaboration * weights.collaboration,
        cyclePrediction: normalized.cyclePrediction * weights.cyclePrediction
    };
    
    const breakdownItems = [
        {
            label: '诉求次数',
            value: dims.requestCount,
            unit: '次',
            normalized: normalized.requestCount.toFixed(1),
            weight: (weights.requestCount * 100).toFixed(0) + '%',
            contribution: contributions.requestCount.toFixed(2)
        },
        {
            label: '诉求来源统计',
            value: dims.requestSource.toFixed(1),
            unit: '分',
            normalized: normalized.requestSource.toFixed(1),
            weight: (weights.requestSource * 100).toFixed(0) + '%',
            contribution: contributions.requestSource.toFixed(2)
        },
        {
            label: '诉求情绪分值',
            value: dims.emotionScore.toFixed(1),
            unit: '分',
            normalized: normalized.emotionScore.toFixed(1),
            weight: (weights.emotionScore * 100).toFixed(0) + '%',
            contribution: contributions.emotionScore.toFixed(2)
        },
        {
            label: '协同办理关联度',
            value: dims.collaboration.toFixed(1),
            unit: '分',
            normalized: normalized.collaboration.toFixed(1),
            weight: (weights.collaboration * 100).toFixed(0) + '%',
            contribution: contributions.collaboration.toFixed(2)
        },
        {
            label: '处置周期预测',
            value: dims.cyclePrediction.toFixed(1),
            unit: '分',
            normalized: normalized.cyclePrediction.toFixed(1),
            weight: (weights.cyclePrediction * 100).toFixed(0) + '%',
            contribution: contributions.cyclePrediction.toFixed(2)
        }
    ];
    
    const breakdownHtml = `
        <div class="score-breakdown-header">
            <div class="breakdown-header-item">维度</div>
            <div class="breakdown-header-item">原始值</div>
            <div class="breakdown-header-item">标准化</div>
            <div class="breakdown-header-item">权重</div>
            <div class="breakdown-header-item">贡献值</div>
        </div>
        <div class="score-breakdown-items">
            ${breakdownItems.map(item => `
                <div class="breakdown-item">
                    <div class="breakdown-label">${item.label}</div>
                    <div class="breakdown-value">${item.value}${item.unit}</div>
                    <div class="breakdown-normalized">${item.normalized}分</div>
                    <div class="breakdown-weight">${item.weight}</div>
                    <div class="breakdown-contribution">${item.contribution}分</div>
                </div>
            `).join('')}
        </div>
        <div class="score-breakdown-total">
            <div class="breakdown-total-label">综合挑战指数</div>
            <div class="breakdown-total-value">${totalScore.toFixed(1)}分</div>
        </div>
    `;
    
    breakdownContainer.innerHTML = breakdownHtml;
}

// 关注人群高频诉求模块
function initKeyPersonRequests() {
    const container = document.getElementById('populationRequestsScrollContent');
    if (!container) return;
    
    // 定义8种人群及其高频诉求（每个人群只显示一个最高频的诉求）
    const populationRequests = [
        { 
            population: '新市民劳动者', 
            request: { type: '住房保障', count: 12456 }
        },
        { 
            population: '新就业群体', 
            request: { type: '职业培训', count: 3421 }
        },
        { 
            population: '青年群体', 
            request: { type: '就业创业', count: 15678 }
        },
        { 
            population: '困境群体', 
            request: { type: '生活救助', count: 4321 }
        },
        { 
            population: '特殊群体', 
            request: { type: '康复服务', count: 1234 }
        },
        { 
            population: '重点人员', 
            request: { type: '帮教服务', count: 234 }
        },
        { 
            population: '农民工', 
            request: { type: '工资拖欠', count: 23456 }
        },
        { 
            population: '职业投诉人', 
            request: { type: '消费维权', count: 567 }
        }
    ];
    
    // 生成HTML - 滚动列表（每个人群只显示一行）
    let html = '';
    populationRequests.forEach((item) => {
        // 将数据编码为JSON字符串存储在data属性中
        const itemData = encodeURIComponent(JSON.stringify(item));
        html += `<div class="population-request-item" data-item="${itemData}" style="cursor: pointer;">
            <div class="request-population">${item.population}</div>
            <div class="request-type">${item.request.type}</div>
            <div class="request-count">${item.request.count.toLocaleString()}件</div>
        </div>`;
    });
    
    // 为了循环滚动，复制一份内容
    html += html;
    
    container.innerHTML = html;
    
    // 为每个population-request-item添加点击事件
    const items = container.querySelectorAll('.population-request-item');
    items.forEach(item => {
        item.addEventListener('click', function() {
            const itemData = this.getAttribute('data-item');
            if (itemData) {
                try {
                    const data = JSON.parse(decodeURIComponent(itemData));
                    openPopulationRequestModal(data);
                } catch (e) {
                    console.error('解析数据失败:', e);
                }
            }
        });
    });
    
    // 初始化弹窗
    initPopulationRequestModal();
}

// 治理难度排行榜模块
// 治理挑战指数模块
function initChallengeIndex() {
    const container = document.querySelector('.challenge-cards-container');
    if (!container) return;
    
    // 计算总分函数（由5个维度计算）
    function calculateTotalScore(dimensions) {
        // 权重分配
        const weights = {
            requestCount: 0.25,      // 诉求次数 25%
            requestSource: 0.20,    // 诉求来源统计 20%
            emotionScore: 0.20,     // 诉求情绪分值 20%
            collaboration: 0.20,     // 协同办理关联度 20%
            cyclePrediction: 0.15   // 处置周期预测 15%
        };
        
        // 每个维度转换为10分制（假设原始值范围不同，需要标准化）
        const normalized = {
            requestCount: Math.min(10, (dimensions.requestCount / 1000) * 10), // 假设1000次为满分
            requestSource: dimensions.requestSource, // 已经是0-10分
            emotionScore: dimensions.emotionScore,   // 已经是0-10分
            collaboration: dimensions.collaboration,  // 已经是0-10分
            cyclePrediction: dimensions.cyclePrediction // 已经是0-10分
        };
        
        // 加权计算总分
        const total = 
            normalized.requestCount * weights.requestCount +
            normalized.requestSource * weights.requestSource +
            normalized.emotionScore * weights.emotionScore +
            normalized.collaboration * weights.collaboration +
            normalized.cyclePrediction * weights.cyclePrediction;
        
        return Math.round(total * 10) / 10; // 保留一位小数
    }
    
    // 挑战项数据池（包含5个维度的详细数据）
    const challengeDataPool = [
        { 
            title: '老旧小区改造', 
            area: '市中区', 
            dimensions: {
                requestCount: 856,      // 诉求次数
                requestSource: 8.5,     // 诉求来源统计
                emotionScore: 9.2,      // 诉求情绪分值
                collaboration: 9.0,     // 协同办理关联度
                cyclePrediction: 9.5    // 处置周期预测
            }
        },
        { 
            title: '环境噪音治理', 
            area: '薛城区', 
            dimensions: {
                requestCount: 642,
                requestSource: 8.0,
                emotionScore: 8.8,
                collaboration: 8.2,
                cyclePrediction: 8.5
            }
        },
        { 
            title: '停车管理优化', 
            area: '峄城区', 
            dimensions: {
                requestCount: 523,
                requestSource: 7.5,
                emotionScore: 7.9,
                collaboration: 7.8,
                cyclePrediction: 8.0
            }
        },
        { 
            title: '道路积水整治', 
            area: '台儿庄区', 
            dimensions: {
                requestCount: 412,
                requestSource: 7.2,
                emotionScore: 7.5,
                collaboration: 7.0,
                cyclePrediction: 7.3
            }
        },
        { 
            title: '垃圾清运规范', 
            area: '山亭区', 
            dimensions: {
                requestCount: 389,
                requestSource: 6.8,
                emotionScore: 7.0,
                collaboration: 6.9,
                cyclePrediction: 7.0
            }
        },
        { 
            title: '市容环境整治', 
            area: '滕州市', 
            dimensions: {
                requestCount: 678,
                requestSource: 8.2,
                emotionScore: 8.3,
                collaboration: 8.0,
                cyclePrediction: 8.1
            }
        },
        { 
            title: '公共设施维护', 
            area: '市中区', 
            dimensions: {
                requestCount: 567,
                requestSource: 7.6,
                emotionScore: 7.8,
                collaboration: 7.4,
                cyclePrediction: 7.5
            }
        },
        { 
            title: '交通秩序管理', 
            area: '薛城区', 
            dimensions: {
                requestCount: 445,
                requestSource: 6.5,
                emotionScore: 6.8,
                collaboration: 6.4,
                cyclePrediction: 6.5
            }
        },
        { 
            title: '消防安全隐患', 
            area: '峄城区', 
            dimensions: {
                requestCount: 789,
                requestSource: 9.0,
                emotionScore: 9.1,
                collaboration: 8.8,
                cyclePrediction: 8.9
            }
        },
        { 
            title: '供水供电保障', 
            area: '台儿庄区', 
            dimensions: {
                requestCount: 456,
                requestSource: 7.4,
                emotionScore: 7.6,
                collaboration: 7.2,
                cyclePrediction: 7.3
            }
        },
        { 
            title: '网络通信故障', 
            area: '山亭区', 
            dimensions: {
                requestCount: 334,
                requestSource: 6.9,
                emotionScore: 7.1,
                collaboration: 6.7,
                cyclePrediction: 6.8
            }
        },
        { 
            title: '物业管理纠纷', 
            area: '滕州市', 
            dimensions: {
                requestCount: 512,
                requestSource: 7.7,
                emotionScore: 7.9,
                collaboration: 7.5,
                cyclePrediction: 7.6
            }
        },
        { 
            title: '违章建筑拆除', 
            area: '市中区', 
            dimensions: {
                requestCount: 623,
                requestSource: 8.4,
                emotionScore: 8.6,
                collaboration: 8.2,
                cyclePrediction: 8.3
            }
        },
        { 
            title: '食品安全监管', 
            area: '薛城区', 
            dimensions: {
                requestCount: 478,
                requestSource: 8.0,
                emotionScore: 8.2,
                collaboration: 7.8,
                cyclePrediction: 7.9
            }
        },
        { 
            title: '教育资源配置', 
            area: '峄城区', 
            dimensions: {
                requestCount: 356,
                requestSource: 6.8,
                emotionScore: 7.0,
                collaboration: 6.6,
                cyclePrediction: 6.7
            }
        },
        { 
            title: '医疗服务质量', 
            area: '台儿庄区', 
            dimensions: {
                requestCount: 423,
                requestSource: 7.5,
                emotionScore: 7.7,
                collaboration: 7.3,
                cyclePrediction: 7.4
            }
        },
        { 
            title: '就业创业扶持', 
            area: '山亭区', 
            dimensions: {
                requestCount: 312,
                requestSource: 6.7,
                emotionScore: 6.9,
                collaboration: 6.5,
                cyclePrediction: 6.6
            }
        },
        { 
            title: '养老服务保障', 
            area: '滕州市', 
            dimensions: {
                requestCount: 445,
                requestSource: 8.1,
                emotionScore: 8.3,
                collaboration: 7.9,
                cyclePrediction: 8.0
            }
        },
        { 
            title: '文化设施建设', 
            area: '市中区', 
            dimensions: {
                requestCount: 289,
                requestSource: 7.2,
                emotionScore: 7.4,
                collaboration: 7.0,
                cyclePrediction: 7.1
            }
        },
        { 
            title: '体育场馆管理', 
            area: '薛城区', 
            dimensions: {
                requestCount: 267,
                requestSource: 6.5,
                emotionScore: 6.7,
                collaboration: 6.3,
                cyclePrediction: 6.4
            }
        }
    ];
    
    // 为每个数据项计算总分
    challengeDataPool.forEach(item => {
        item.value = calculateTotalScore(item.dimensions);
    });
    
    // 显示数量（每次显示5个）
    const displayCount = 5;
    
    // 初始化弹窗
    initChallengeIndexModal();
    
    // 初始化显示
    function renderChallenges(isInitial = false) {
        // 如果不是初始加载，先执行退出动画
        if (!isInitial) {
            container.classList.add('exiting');
            
            // 等待退出动画完成后再更新内容
            setTimeout(() => {
                container.classList.remove('exiting');
                updateContent();
            }, 600);
        } else {
            updateContent(true);
        }
    }
    
    function updateContent(isInitial = false) {
        // 随机选择不重复的挑战项
        const shuffled = [...challengeDataPool].sort(() => Math.random() - 0.5);
        const selected = shuffled.slice(0, displayCount);
        
        // 生成HTML
        let html = '';
        selected.forEach((item, index) => {
            // 将完整数据编码存储
            const itemData = encodeURIComponent(JSON.stringify(item));
            html += `
                <div class="challenge-card" data-index="${index}" data-value="${item.value}" data-item="${itemData}" style="cursor: pointer;">
                    <div class="challenge-info">
                        <div class="challenge-title">${item.title}</div>
                    </div>
                    <div class="challenge-area">${item.area}</div>
                    <div class="challenge-score">
                        <span class="challenge-number" data-target="${item.value}">${item.value.toFixed(1)}</span>
                    </div>
                </div>
            `;
        });
        
        // 更新内容
        container.innerHTML = html;
        
        // 如果不是初始加载，添加进入动画
        if (!isInitial) {
            container.classList.add('entering');
            setTimeout(() => {
                container.classList.remove('entering');
            }, 600);
        }
        
        // 重新绑定事件
        const challengeCards = container.querySelectorAll('.challenge-card');
        challengeCards.forEach((card, index) => {
            const numberElement = card.querySelector('.challenge-number');
            const targetValue = parseFloat(card.getAttribute('data-value')) || 0;
            
            // 直接显示目标值，不进行滚动动画
            if (numberElement) {
                numberElement.textContent = targetValue.toFixed(1);
                numberElement.setAttribute('data-current', targetValue);
            }
            
            // 添加点击事件
            card.addEventListener('click', function() {
                const itemData = this.getAttribute('data-item');
                if (itemData) {
                    try {
                        const data = JSON.parse(decodeURIComponent(itemData));
                        openChallengeIndexModal(data);
                    } catch (e) {
                        console.error('解析数据失败:', e);
                    }
                }
            });
        });
    }
    
    // 初始渲染
    setTimeout(() => {
        renderChallenges(true);
    }, 600);
    
    // 定期更新（停留5秒 + 动画时间约0.6秒 = 5.6秒）
    setInterval(() => {
        renderChallenges(false);
    }, 5600);
}

// 小数数字滚动动画函数
function animateDecimalNumber(element, startValue, endValue, duration = 1000) {
    if (!element) return;
    
    const startTime = Date.now();
    const difference = endValue - startValue;
    
    function update() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // 使用缓动函数
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        const currentValue = startValue + difference * easeProgress;
        const roundedValue = Math.round(currentValue * 10) / 10; // 保留一位小数
        
        element.textContent = roundedValue.toFixed(1);
        element.setAttribute('data-current', roundedValue);
        
        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            element.textContent = endValue.toFixed(1);
            element.setAttribute('data-current', endValue);
        }
    }
    
    requestAnimationFrame(update);
}

// 关注人群模块
function initRiskGovernance() {
    const container = document.getElementById('concernedPopulationGrid');
    if (!container) return;
    
    // 定义8类人群
    const populationTypes = [
        { name: '新市民劳动者', count: 656784 },
        { name: '新就业群体', count: 13109 },
        { name: '青年群体', count: 349779 },
        { name: '困境群体', count: 8151 },
        { name: '特殊群体', count: 1210 },
        { name: '重点人员', count: 119 },
        { name: '农民工', count: 501936 },
        { name: '职业投诉人', count: 113 }
    ];
    
    // 生成HTML - 4列2行布局（上边四个，下边四个）
    let html = '';
    populationTypes.forEach((type, index) => {
        // 将数据编码存储
        const typeData = encodeURIComponent(JSON.stringify(type));
        html += `<div class="population-card" data-population-type="${type.name}" data-item="${typeData}" style="cursor: pointer;">
            <div class="population-card-content">
                <div class="population-name-label">${type.name}</div>
                <div class="population-count-wrapper">
                    <div class="population-count-number" id="popCount_${index}" data-current="${type.count}">${type.count.toLocaleString()}人</div>
                </div>
            </div>
        </div>`;
    });
    
    container.innerHTML = html;
    
    // 为每个population-card添加点击事件
    const cards = container.querySelectorAll('.population-card');
    cards.forEach(card => {
        card.addEventListener('click', function() {
            const itemData = this.getAttribute('data-item');
            if (itemData) {
                try {
                    const data = JSON.parse(decodeURIComponent(itemData));
                    openConcernedPopulationModal(data);
                } catch (e) {
                    console.error('解析数据失败:', e);
                }
            }
        });
    });
    
    // 初始化弹窗
    initConcernedPopulationModal();
    
    // 定期更新数据（每30秒）- 在固定值基础上小幅度波动
    setInterval(() => {
        const baseValues = [656784, 13109, 349779, 8151, 1210, 119, 501936, 113];
        populationTypes.forEach((type, index) => {
            const baseValue = baseValues[index];
            const change = Math.floor(Math.random() * 20) - 10; // -10到+10的变化
            type.count = Math.max(0, baseValue + change);
            
            // 更新显示 - 使用滚动动画
            const countElement = document.getElementById(`popCount_${index}`);
            if (countElement) {
                const currentCount = parseInt(countElement.getAttribute('data-current')) || baseValue;
                if (currentCount !== type.count) {
                    animateRollingNumber(countElement, currentCount, type.count);
                }
            }
        });
    }, 30000);
}

// 关注人群弹窗
function initConcernedPopulationModal() {
    const modal = document.getElementById('concernedPopulationModal');
    const closeBtn = document.getElementById('closeConcernedPopulationModal');
    const overlay = modal?.querySelector('.modal-overlay');
    
    if (!modal) return;
    
    // 关闭按钮
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            closeConcernedPopulationModal();
        });
    }
    
    // 点击遮罩层关闭
    if (overlay) {
        overlay.addEventListener('click', function() {
            closeConcernedPopulationModal();
        });
    }
    
    // ESC键关闭
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeConcernedPopulationModal();
        }
    });
}

function openConcernedPopulationModal(data) {
    const modal = document.getElementById('concernedPopulationModal');
    if (!modal) return;
    
    // 更新弹窗数据
    updateConcernedPopulationModalData(data);
    
    // 显示弹窗
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeConcernedPopulationModal() {
    const modal = document.getElementById('concernedPopulationModal');
    if (!modal) return;
    
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

function updateConcernedPopulationModalData(data) {
    // 更新标题
    const title = document.getElementById('concernedPopulationModalTitle');
    if (title) {
        title.textContent = `${data.name}详情分析`;
    }
    
    // 生成人数统计
    generatePopulationStats(data);
    
    // 生成地区分布
    generateRegionDistribution(data);
    
    // 生成诉求占比
    generateRequestRatio(data);
    
    // 生成高频诉求类型
    generateHighFrequencyRequests(data);
    
    // 生成AI分析（缓慢生成效果）
    generatePopulationAIAnalysis(data);
}

function generatePopulationStats(data) {
    const statsContainer = document.getElementById('populationStatsGrid');
    if (!statsContainer) return;
    
    // 计算同比和环比（模拟数据）
    const yearOverYear = (Math.random() * 8 - 4).toFixed(1); // -4% 到 +4%
    const monthOverMonth = (Math.random() * 6 - 3).toFixed(1); // -3% 到 +3%
    
    const statsHtml = `
        <div class="population-stat-card">
            <div class="stat-card-title">总人数</div>
            <div class="stat-card-value">${data.count.toLocaleString()}人</div>
            <div class="stat-card-label">当前统计</div>
        </div>
        <div class="population-stat-card">
            <div class="stat-card-title">同比变化</div>
            <div class="stat-card-value ${parseFloat(yearOverYear) >= 0 ? 'up' : 'down'}">${parseFloat(yearOverYear) >= 0 ? '+' : ''}${yearOverYear}%</div>
            <div class="stat-card-label">较去年同期</div>
        </div>
        <div class="population-stat-card">
            <div class="stat-card-title">环比变化</div>
            <div class="stat-card-value ${parseFloat(monthOverMonth) >= 0 ? 'up' : 'down'}">${parseFloat(monthOverMonth) >= 0 ? '+' : ''}${monthOverMonth}%</div>
            <div class="stat-card-label">较上月</div>
        </div>
    `;
    
    statsContainer.innerHTML = statsHtml;
}

function generateRegionDistribution(data) {
    const regionContainer = document.getElementById('regionDistributionList');
    if (!regionContainer) return;
    
    // 根据人群类型生成不同的地区分布（模拟数据）
    const regions = [
        { name: '市中区', count: Math.floor(data.count * 0.25), percentage: 25 },
        { name: '薛城区', count: Math.floor(data.count * 0.20), percentage: 20 },
        { name: '峄城区', count: Math.floor(data.count * 0.18), percentage: 18 },
        { name: '台儿庄区', count: Math.floor(data.count * 0.15), percentage: 15 },
        { name: '山亭区', count: Math.floor(data.count * 0.12), percentage: 12 },
        { name: '滕州市', count: Math.floor(data.count * 0.10), percentage: 10 }
    ];
    
    const regionHtml = `
        <div class="region-list">
            ${regions.map(region => `
                <div class="region-item">
                    <div class="region-info">
                        <div class="region-name">${region.name}</div>
                        <div class="region-count">${region.count.toLocaleString()}人</div>
                    </div>
                    <div class="region-bar">
                        <div class="region-bar-fill" style="width: ${region.percentage}%;"></div>
                    </div>
                    <div class="region-percentage">${region.percentage}%</div>
                </div>
            `).join('')}
        </div>
    `;
    
    regionContainer.innerHTML = regionHtml;
}

function generateRequestRatio(data) {
    const ratioContainer = document.getElementById('requestRatioContent');
    if (!ratioContainer) return;
    
    // 计算该人群的诉求占比（模拟数据）
    const totalRequests = 65000; // 假设总诉求数
    const populationRequests = Math.floor(data.count * 0.15); // 假设15%的人群有诉求
    const ratio = ((populationRequests / totalRequests) * 100).toFixed(1);
    
    const ratioHtml = `
        <div class="request-ratio-display">
            <div class="ratio-circle">
                <div class="ratio-value">${ratio}%</div>
                <div class="ratio-label">诉求占比</div>
            </div>
            <div class="ratio-details">
                <div class="ratio-detail-item">
                    <span class="ratio-detail-label">该人群诉求数</span>
                    <span class="ratio-detail-value">${populationRequests.toLocaleString()}件</span>
                </div>
                <div class="ratio-detail-item">
                    <span class="ratio-detail-label">总诉求数</span>
                    <span class="ratio-detail-value">${totalRequests.toLocaleString()}件</span>
                </div>
            </div>
        </div>
    `;
    
    ratioContainer.innerHTML = ratioHtml;
}

function generateHighFrequencyRequests(data) {
    const frequencyContainer = document.getElementById('highFrequencyList');
    if (!frequencyContainer) return;
    
    // 根据人群类型生成不同的高频诉求（模拟数据）
    const requestMap = {
        '新市民劳动者': [
            { type: '住房保障', count: 12456, percentage: 35 },
            { type: '就业服务', count: 8923, percentage: 25 },
            { type: '子女教育', count: 7124, percentage: 20 },
            { type: '医疗保障', count: 5343, percentage: 15 },
            { type: '其他', count: 1781, percentage: 5 }
        ],
        '新就业群体': [
            { type: '职业培训', count: 3421, percentage: 40 },
            { type: '就业指导', count: 2566, percentage: 30 },
            { type: '创业扶持', count: 1710, percentage: 20 },
            { type: '其他', count: 856, percentage: 10 }
        ],
        '青年群体': [
            { type: '就业创业', count: 15678, percentage: 45 },
            { type: '住房保障', count: 10452, percentage: 30 },
            { type: '婚恋服务', count: 5234, percentage: 15 },
            { type: '其他', count: 3489, percentage: 10 }
        ],
        '困境群体': [
            { type: '生活救助', count: 4321, percentage: 50 },
            { type: '医疗救助', count: 2160, percentage: 25 },
            { type: '就业援助', count: 1296, percentage: 15 },
            { type: '其他', count: 864, percentage: 10 }
        ],
        '特殊群体': [
            { type: '康复服务', count: 1234, percentage: 55 },
            { type: '生活照料', count: 617, percentage: 28 },
            { type: '就业支持', count: 222, percentage: 10 },
            { type: '其他', count: 111, percentage: 7 }
        ],
        '重点人员': [
            { type: '帮教服务', count: 234, percentage: 60 },
            { type: '就业安置', count: 78, percentage: 20 },
            { type: '心理疏导', count: 58, percentage: 15 },
            { type: '其他', count: 23, percentage: 5 }
        ],
        '农民工': [
            { type: '工资拖欠', count: 23456, percentage: 50 },
            { type: '劳动保障', count: 14073, percentage: 30 },
            { type: '子女教育', count: 4691, percentage: 10 },
            { type: '其他', count: 4691, percentage: 10 }
        ],
        '职业投诉人': [
            { type: '消费维权', count: 567, percentage: 70 },
            { type: '服务质量', count: 162, percentage: 20 },
            { type: '其他', count: 81, percentage: 10 }
        ]
    };
    
    const requests = requestMap[data.name] || [
        { type: '其他诉求', count: Math.floor(data.count * 0.1), percentage: 100 }
    ];
    
    const frequencyHtml = `
        <div class="frequency-list">
            ${requests.map(req => `
                <div class="frequency-item">
                    <div class="frequency-info">
                        <div class="frequency-type">${req.type}</div>
                        <div class="frequency-count">${req.count.toLocaleString()}件</div>
                    </div>
                    <div class="frequency-bar">
                        <div class="frequency-bar-fill" style="width: ${req.percentage}%;"></div>
                    </div>
                    <div class="frequency-percentage">${req.percentage}%</div>
                </div>
            `).join('')}
        </div>
    `;
    
    frequencyContainer.innerHTML = frequencyHtml;
}

function generatePopulationAIAnalysis(data) {
    const generatingElement = document.getElementById('aiAnalysisGenerating');
    const analysisTextElement = document.getElementById('populationAIAnalysisText');
    
    if (!generatingElement || !analysisTextElement) return;
    
    // 显示生成中状态
    generatingElement.style.display = 'flex';
    analysisTextElement.style.display = 'none';
    analysisTextElement.innerHTML = '';
    
    // 根据人群类型生成AI分析文本
    const analysisTexts = {
        '新市民劳动者': `根据关注人群数据分析，${data.name}总人数为${data.count.toLocaleString()}人，主要分布在市中区、薛城区等核心区域，是城市发展的重要力量。该人群的诉求主要集中在住房保障、就业服务和子女教育等方面，诉求占比约为15%，反映了新市民在融入城市过程中面临的主要挑战。从地区分布来看，新市民劳动者主要集中在经济发展较好的区域，这些区域提供了更多的就业机会，但也带来了住房和教育资源的竞争。建议加强住房保障政策，完善公租房、保障性住房供应体系，完善就业服务体系，提供职业培训和就业指导，优化教育资源分配，保障随迁子女平等接受教育的权利，提升新市民的融入感和归属感，同时建立新市民服务窗口，提供一站式服务。`,
        '新就业群体': `根据关注人群数据分析，${data.name}总人数为${data.count.toLocaleString()}人，以刚进入职场的年轻人为主，是城市活力的重要来源。该人群的诉求主要集中在职业培训、就业指导和创业扶持等方面，诉求占比约为12%，反映了新就业群体在职业发展初期的迫切需求。从诉求特征来看，新就业群体更关注职业发展机会、技能提升和创业支持，希望获得更多的成长空间。建议建立职业发展支持体系，提供技能培训和就业指导，鼓励创新创业，提供创业贷款和税收优惠政策，帮助新就业群体快速适应职场环境，同时建立职业导师制度，提供一对一的职业指导服务。`,
        '青年群体': `根据关注人群数据分析，${data.name}总人数为${data.count.toLocaleString()}人，是城市发展的重要力量，承载着城市未来的希望。该人群的诉求主要集中在就业创业、住房保障和婚恋服务等方面，诉求占比约为18%，反映了青年群体在人生关键阶段面临的多重压力。从诉求分布来看，青年群体对就业创业机会、住房保障和婚恋服务的需求较为集中，这些需求相互关联，需要统筹考虑。建议完善青年创业扶持政策，提供创业资金支持和政策优惠，优化住房保障机制，为青年群体提供更多住房选择，搭建青年交流平台，组织各类活动促进青年交流，为青年群体提供全方位支持，同时关注青年心理健康，提供心理咨询服务。`,
        '困境群体': `根据关注人群数据分析，${data.name}总人数为${data.count.toLocaleString()}人，需要重点关注和帮扶，是社会保障的重点对象。该人群的诉求主要集中在生活救助、医疗救助和就业援助等方面，诉求占比约为20%，反映了困境群体在基本生活保障方面的迫切需求。从诉求特征来看，困境群体更需要基本生活保障、医疗救助和就业援助，这些是改善其生活状况的关键。建议建立完善的救助体系，加强生活救助保障，确保基本生活需求得到满足，加强医疗救助保障，提供医疗费用减免和医疗救助服务，提供就业援助服务，帮助困境群体实现就业，帮助困境群体改善生活状况，同时建立跟踪帮扶机制，持续关注困境群体的生活状况。`,
        '特殊群体': `根据关注人群数据分析，${data.name}总人数为${data.count.toLocaleString()}人，需要特殊关爱和服务，是社会保障的重点关注对象。该人群的诉求主要集中在康复服务、生活照料和就业支持等方面，诉求占比约为25%，反映了特殊群体在康复、生活和就业方面的多重需求。从诉求特征来看，特殊群体更需要专业化的康复服务、生活照料和就业支持，这些服务需要专业团队和专门设施。建议建立专业化的服务团队，提供康复训练和生活照料，支持就业安置，为特殊群体提供适合的就业岗位，提升特殊群体的生活质量，同时加强无障碍设施建设，为特殊群体提供更好的生活环境。`,
        '重点人员': `根据关注人群数据分析，${data.name}总人数为${data.count.toLocaleString()}人，需要重点管理和服务，是社会治理的重点对象。该人群的诉求主要集中在帮教服务、就业安置和心理疏导等方面，诉求占比约为30%，反映了重点人员在回归社会过程中面临的主要困难。从诉求特征来看，重点人员更需要帮教服务、就业安置和心理疏导，这些是帮助其回归社会的关键。建议建立帮教工作机制，提供一对一的帮教服务，提供就业安置服务，为重点人员提供就业机会，加强心理疏导，帮助重点人员调整心态，帮助重点人员回归社会，同时建立跟踪管理机制，持续关注重点人员的生活状况。`,
        '农民工': `根据关注人群数据分析，${data.name}总人数为${data.count.toLocaleString()}人，是城市建设的重要力量，为城市发展做出了重要贡献。该人群的诉求主要集中在工资拖欠、劳动保障和子女教育等方面，诉求占比约为22%，反映了农民工在权益保障和子女教育方面的迫切需求。从诉求特征来看，工资拖欠是农民工面临的主要问题，劳动保障和子女教育也是重要关切。建议加强劳动保障执法，严厉打击拖欠工资行为，建立工资支付保障机制，确保工资及时足额支付，优化随迁子女教育政策，保障农民工子女平等接受教育的权利，保障农民工合法权益，同时加强农民工技能培训，提升其就业竞争力。`,
        '职业投诉人': `根据关注人群数据分析，${data.name}总人数为${data.count.toLocaleString()}人，需要专业引导和服务，是诉求处理的重点对象。该人群的诉求主要集中在消费维权、服务质量等方面，诉求占比约为8%，虽然占比不高，但需要重点关注。从诉求特征来看，职业投诉人更关注消费维权和服务质量，希望通过投诉维护自身权益。建议建立专业引导机制，提供法律咨询服务，帮助职业投诉人了解相关法律法规，优化服务质量，提升服务水平和效率，引导职业投诉人通过合法途径解决问题，同时建立投诉处理反馈机制，及时回应职业投诉人的关切。`
    };
    
    const fullText = analysisTexts[data.name] || `根据数据分析，${data.name}总人数为${data.count.toLocaleString()}人，需要持续关注和优化服务。`;
    
    // 延迟1秒后开始逐字显示
    setTimeout(() => {
        typeWriterEffect(analysisTextElement, fullText, generatingElement);
    }, 1000);
}

function typeWriterEffect(element, text, generatingElement) {
    let index = 0;
    element.innerHTML = '';
    element.style.display = 'block';
    generatingElement.style.display = 'none';
    
    function type() {
        if (index < text.length) {
            element.innerHTML += text.charAt(index);
            index++;
            setTimeout(type, 60); // 每60毫秒显示一个字符（慢两倍）
        }
    }
    
    type();
}

// 重点人群图表
function initPopulationChart() {
    const chartDom = document.getElementById('populationChart');
    if (!chartDom) return;
    
    const myChart = echarts.getInstanceByDom(chartDom);
    if (myChart) {
        myChart.dispose();
    }
    
    const newChart = echarts.init(chartDom);
    
    const option = {
        backgroundColor: 'transparent',
        tooltip: {
            trigger: 'item',
            textStyle: {
                color: '#ffffff'
            }
        },
        series: [{
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
                borderRadius: 10,
                borderColor: '#0a0e1a',
                borderWidth: 2
            },
            label: {
                show: true,
                color: '#8db8d8',
                fontSize: 10
            },
            labelLine: {
                show: true,
                lineStyle: {
                    color: '#8db8d8'
                }
            },
            data: [
                { value: 12345, name: '老年人群', itemStyle: { color: '#7db8e6' } },
                { value: 8901, name: '未成年人', itemStyle: { color: '#5a9bc4' } },
                { value: 3456, name: '残障人士', itemStyle: { color: '#4a8ab8' } },
                { value: 2789, name: '困难家庭', itemStyle: { color: '#3a7aac' } }
            ]
        }]
    };
    
    newChart.setOption(option);
    
    window.addEventListener('resize', () => {
        newChart.resize();
    });
}

// 新业态人员图表
function initFormatChart() {
    const chartDom = document.getElementById('formatChart');
    if (!chartDom) return;
    
    const myChart = echarts.getInstanceByDom(chartDom);
    if (myChart) {
        myChart.dispose();
    }
    
    const newChart = echarts.init(chartDom);
    
    const option = {
        backgroundColor: 'transparent',
        grid: {
            left: '15%',
            right: '10%',
            top: '10%',
            bottom: '15%'
        },
        xAxis: {
            type: 'value',
            axisLine: {
                lineStyle: {
                    color: '#7db8e6'
                }
            },
            axisLabel: {
                color: '#8db8d8',
                fontSize: 10
            },
            splitLine: {
                lineStyle: {
                    color: 'rgba(100, 180, 255, 0.1)'
                }
            }
        },
        yAxis: {
            type: 'category',
            data: ['网络主播', '快递员', '外卖配送员', '网约车司机'],
            axisLine: {
                lineStyle: {
                    color: '#7db8e6'
                }
            },
            axisLabel: {
                color: '#8db8d8',
                fontSize: 10
            }
        },
        series: [{
            type: 'bar',
            data: [1234, 3234, 4567, 5678],
            itemStyle: {
                color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 1,
                    y2: 0,
                    colorStops: [{
                        offset: 0,
                        color: '#7db8e6'
                    }, {
                        offset: 1,
                        color: '#5a9bc4'
                    }]
                }
            },
            label: {
                show: true,
                position: 'right',
                color: '#7db8e6',
                fontSize: 10
            }
        }]
    };
    
    newChart.setOption(option);
    
    window.addEventListener('resize', () => {
        newChart.resize();
    });
}

// 智能预测模块
function initAIPrediction() {
    const periodSelect = document.getElementById('predictionPeriod');
    const updateBtn = document.getElementById('updatePrediction');
    const locationBtn = document.getElementById('locationPrediction');
    
    initPredictionChart();
    
    if (updateBtn) {
        updateBtn.addEventListener('click', function() {
            // 添加刷新动画
            this.classList.add('refreshing');
            updatePrediction(true);
            // 移除动画类
            setTimeout(() => {
                this.classList.remove('refreshing');
            }, 1000);
        });
    }
    
    if (locationBtn) {
        locationBtn.addEventListener('click', function() {
            // 添加点击动画
            this.classList.add('location-active');
            // 更新地图标记位置
            updateMapMarkerPositions();
            // 移除动画类
            setTimeout(() => {
                this.classList.remove('location-active');
            }, 600);
        });
    }
    
    // 主要原因分析点击事件
    const predictionReasonsSection = document.getElementById('predictionReasonsSection');
    if (predictionReasonsSection) {
        predictionReasonsSection.addEventListener('click', function() {
            openPredictionReasonModal();
        });
    }
    
    // 初始化主要原因分析弹窗
    initPredictionReasonModal();
    
    if (periodSelect) {
        periodSelect.addEventListener('change', function() {
            updatePrediction();
        });
    }
    
    updatePrediction();
    
    setInterval(() => {
        updatePrediction();
    }, 30000);
}

// 初始化预测图表
function initPredictionChart() {
    const chartDom = document.getElementById('predictionChart');
    if (!chartDom) return;
    
    const myChart = echarts.init(chartDom);
    
    const option = {
        backgroundColor: 'transparent',
        grid: {
            left: '10%',
            right: '10%',
            top: '15%',
            bottom: '15%'
        },
        xAxis: {
            type: 'category',
            data: [],
            axisLine: {
                lineStyle: {
                    color: '#7db8e6'
                }
            },
            axisLabel: {
                color: '#8db8d8',
                fontSize: 10
            }
        },
        yAxis: {
            type: 'value',
            axisLine: {
                lineStyle: {
                    color: '#7db8e6'
                }
            },
            axisLabel: {
                color: '#8db8d8',
                fontSize: 10
            },
            splitLine: {
                lineStyle: {
                    color: 'rgba(100, 180, 255, 0.1)'
                }
            }
        },
        series: [{
            name: '历史数据',
            type: 'line',
            data: [],
            smooth: true,
            lineStyle: {
                color: '#7db8e6',
                width: 2
            },
            itemStyle: {
                color: '#7db8e6'
            }
        }, {
            name: '预测数据',
            type: 'line',
            data: [],
            smooth: true,
            lineStyle: {
                color: '#ff9800',
                width: 2,
                type: 'dashed'
            },
            itemStyle: {
                color: '#ff9800'
            }
        }]
    };
    
    myChart.setOption(option);
    window.predictionChart = myChart;
    window.predictionChartOption = option;
}

// 更新预测数据
function updatePrediction(isManualUpdate = false) {
    const periodSelect = document.getElementById('predictionPeriod');
    const period = periodSelect ? periodSelect.value : 'week';
    
    let days, labels, historicalData, predictedData;
    
    // 如果是手动更新，在现有数据基础上做微小幅度的变化
    if (isManualUpdate && window.predictionChartOption && window.predictionChartOption.series) {
        const currentHistorical = window.predictionChartOption.series[0].data || [];
        const currentPredicted = window.predictionChartOption.series[1].data || [];
        
        if (period === 'week') {
            days = 7;
            labels = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
            historicalData = currentHistorical.length === 7 
                ? currentHistorical.map(val => Math.max(600, Math.min(1200, val + (Math.random() * 40 - 20))))
                : Array.from({ length: 7 }, () => Math.floor(Math.random() * 200) + 800);
            predictedData = currentPredicted.length === 7
                ? currentPredicted.map(val => Math.max(700, Math.min(1300, val + (Math.random() * 40 - 20))))
                : Array.from({ length: 7 }, () => Math.floor(Math.random() * 200) + 900);
        } else if (period === 'month') {
            days = 30;
            labels = Array.from({ length: 30 }, (_, i) => `${i + 1}日`);
            historicalData = currentHistorical.length === 30
                ? currentHistorical.map(val => Math.max(600, Math.min(1200, val + (Math.random() * 40 - 20))))
                : Array.from({ length: 30 }, () => Math.floor(Math.random() * 200) + 800);
            predictedData = currentPredicted.length === 30
                ? currentPredicted.map(val => Math.max(700, Math.min(1300, val + (Math.random() * 40 - 20))))
                : Array.from({ length: 30 }, () => Math.floor(Math.random() * 200) + 900);
        } else {
            days = 90;
            labels = Array.from({ length: 12 }, (_, i) => `第${i + 1}周`);
            historicalData = currentHistorical.length === 12
                ? currentHistorical.map(val => Math.max(1500, Math.min(3000, val + (Math.random() * 100 - 50))))
                : Array.from({ length: 12 }, () => Math.floor(Math.random() * 500) + 2000);
            predictedData = currentPredicted.length === 12
                ? currentPredicted.map(val => Math.max(1700, Math.min(3200, val + (Math.random() * 100 - 50))))
                : Array.from({ length: 12 }, () => Math.floor(Math.random() * 500) + 2200);
        }
    } else {
        // 初始加载或自动更新，生成新数据
        if (period === 'week') {
            days = 7;
            labels = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
            historicalData = Array.from({ length: 7 }, () => Math.floor(Math.random() * 200) + 800);
            predictedData = Array.from({ length: 7 }, () => Math.floor(Math.random() * 200) + 900);
        } else if (period === 'month') {
            days = 30;
            labels = Array.from({ length: 30 }, (_, i) => `${i + 1}日`);
            historicalData = Array.from({ length: 30 }, () => Math.floor(Math.random() * 200) + 800);
            predictedData = Array.from({ length: 30 }, () => Math.floor(Math.random() * 200) + 900);
        } else {
            days = 90;
            labels = Array.from({ length: 12 }, (_, i) => `第${i + 1}周`);
            historicalData = Array.from({ length: 12 }, () => Math.floor(Math.random() * 500) + 2000);
            predictedData = Array.from({ length: 12 }, () => Math.floor(Math.random() * 500) + 2200);
        }
    }
    
    if (window.predictionChart && window.predictionChartOption) {
        window.predictionChartOption.xAxis.data = labels;
        window.predictionChartOption.series[0].data = historicalData;
        window.predictionChartOption.series[1].data = predictedData;
        
        // 如果是手动更新，添加动画效果
        if (isManualUpdate) {
            // 为每个series添加动画
            window.predictionChartOption.series.forEach(series => {
                series.animation = true;
                series.animationDuration = 800;
                series.animationEasing = 'cubicOut';
            });
        } else {
            // 非手动更新时关闭动画（自动更新时）
            window.predictionChartOption.series.forEach(series => {
                series.animation = false;
            });
        }
        
        window.predictionChart.setOption(window.predictionChartOption);
    }
    
    const totalPredicted = predictedData.reduce((a, b) => a + b, 0);
    const avgHistorical = historicalData.reduce((a, b) => a + b, 0) / historicalData.length;
    const avgPredicted = totalPredicted / predictedData.length;
    const trend = ((avgPredicted - avgHistorical) / avgHistorical * 100).toFixed(1);
    
    const predictedCount = document.getElementById('predictedCount');
    const predictedTrend = document.getElementById('predictedTrend');
    
    if (predictedCount) {
        predictedCount.textContent = totalPredicted.toLocaleString();
    }
    
    if (predictedTrend) {
        const isUp = parseFloat(trend) > 0;
        predictedTrend.className = 'prediction-value ' + (isUp ? 'trend-up' : 'trend-down');
        predictedTrend.innerHTML = (isUp ? '↑' : '↓') + ' ' + (isUp ? '上升' : '下降') + ' ' + Math.abs(trend) + '%';
    }
    
    updatePredictionReasons(period);
    updateMapMarkers(predictedData, labels);
}

// 更新预测原因分析
function updatePredictionReasons(period) {
    const reasons = [
        {
            text: '季节性因素：夏季高温导致环境类诉求增加',
            weight: 35
        },
        {
            text: '政策变化：新政策实施引发咨询类诉求上升',
            weight: 28
        },
        {
            text: '区域发展：城市建设带来相关投诉增多',
            weight: 22
        }
    ];
    
    if (period === 'month') {
        reasons[0].text = '月度周期：月初和月末诉求量通常较高';
        reasons[1].weight = 32;
    } else if (period === 'quarter') {
        reasons[0].text = '季度趋势：第三季度为诉求高峰期';
        reasons[1].text = '经济因素：季度末经济活动增加';
    }
    
    const reasonList = document.getElementById('reasonList');
    if (reasonList) {
        reasonList.innerHTML = reasons.map(reason => `
            <div class="reason-item">
                <div class="reason-text">${reason.text}</div>
                <div class="reason-weight">影响权重: ${reason.weight}%</div>
            </div>
        `).join('');
    }
}

// 初始化主要原因分析弹窗
function initPredictionReasonModal() {
    const modal = document.getElementById('predictionReasonModal');
    const closeBtn = document.getElementById('closePredictionReasonModal');
    const overlay = modal ? modal.querySelector('.prediction-reason-modal-overlay') : null;
    
    if (closeBtn) {
        closeBtn.addEventListener('click', closePredictionReasonModal);
    }
    
    if (overlay) {
        overlay.addEventListener('click', closePredictionReasonModal);
    }
    
    // ESC键关闭（统一管理，避免冲突）
    // 注意：ESC键关闭逻辑在页面底部统一处理
}

// 打开主要原因分析弹窗
function openPredictionReasonModal() {
    const modal = document.getElementById('predictionReasonModal');
    if (!modal) return;
    
    const periodSelect = document.getElementById('predictionPeriod');
    const period = periodSelect ? periodSelect.value : 'week';
    
    // 显示弹窗
    modal.classList.add('active');
    
    // 重置AI分析内容
    const summaryGenerating = document.getElementById('predictionReasonAIGenerating');
    const summaryText = document.getElementById('predictionReasonAISummaryText');
    const analysisGenerating = document.getElementById('predictionReasonAnalysisGenerating');
    const analysisText = document.getElementById('predictionReasonAnalysisText');
    
    if (summaryGenerating) summaryGenerating.style.display = 'flex';
    if (summaryText) {
        summaryText.style.display = 'none';
        summaryText.textContent = '';
    }
    if (analysisGenerating) analysisGenerating.style.display = 'flex';
    if (analysisText) {
        analysisText.style.display = 'none';
        analysisText.textContent = '';
    }
    
    // 生成AI总结
    setTimeout(() => {
        generatePredictionReasonAISummary(period);
    }, 500);
    
    // 生成AI预测原因分析
    setTimeout(() => {
        generatePredictionReasonAnalysis(period);
    }, 1500);
}

// 关闭主要原因分析弹窗
function closePredictionReasonModal() {
    const modal = document.getElementById('predictionReasonModal');
    if (modal) {
        modal.classList.remove('active');
    }
}

// 生成AI总结
function generatePredictionReasonAISummary(period) {
    const summaryGenerating = document.getElementById('predictionReasonAIGenerating');
    const summaryText = document.getElementById('predictionReasonAISummaryText');
    
    if (!summaryText) return;
    
    let summaryContent = '';
    
    if (period === 'week') {
        summaryContent = '基于本周历史数据分析和诉求趋势，预测未来一周诉求量将呈现上升态势。主要驱动因素包括季节性变化、政策调整以及区域发展带来的新需求。通过综合分析历史同期数据、当前诉求热点和外部环境因素，系统预测未来7天诉求总量将达到较高水平，建议提前做好应对准备。';
    } else if (period === 'month') {
        summaryContent = '综合分析近30天的历史数据、诉求类型分布和外部环境变化，预测未来一个月诉求量将出现周期性波动。结合月度周期规律、政策实施影响以及季节性因素，系统预测未来30天诉求总量将呈现先升后降的趋势，特别是在月初和月末会出现诉求高峰，需要重点关注和及时响应。';
    } else {
        summaryContent = '基于季度历史数据、长期诉求趋势和宏观经济环境分析，预测未来一季度的诉求量将保持稳定增长。综合考虑季度性规律、政策变化周期、区域发展规划以及外部经济因素，系统预测未来90天诉求总量将呈现稳步上升趋势，第三季度作为传统诉求高峰期，需要提前部署资源和优化响应机制。';
    }
    
    if (summaryGenerating) summaryGenerating.style.display = 'flex';
    if (summaryText) summaryText.style.display = 'none';
    
    typeWriterEffect(summaryText, summaryContent, summaryGenerating);
}

// 生成AI预测原因分析
function generatePredictionReasonAnalysis(period) {
    const analysisGenerating = document.getElementById('predictionReasonAnalysisGenerating');
    const analysisText = document.getElementById('predictionReasonAnalysisText');
    
    if (!analysisText) return;
    
    let analysisContent = '';
    
    if (period === 'week') {
        analysisContent = '【历史数据趋势】\n\n通过对近三个月同期历史数据的分析，发现本周诉求量通常比上周增长约15-20%。特别是在夏季高温期间，环境类诉求（如噪音、污染、垃圾处理等）显著增加，占总体诉求的28%左右。\n\n【诉求类型变化】\n\n1. 年末拖欠薪资诉求增长：临近年底，企业资金周转压力增大，导致拖欠薪资类诉求预计增长35-40%。这类诉求主要集中在制造业、建筑业和餐饮服务业，需要劳动保障部门重点关注。\n\n2. 政策变动引发企业诉求变化：近期新出台的税收优惠政策和环保监管政策，导致企业咨询类诉求上升25%。企业对新政策的理解和执行存在疑问，需要加强政策宣传和指导。\n\n3. 季节性因素影响：当前正值夏季，高温天气导致环境类诉求增加，特别是空调噪音、夜间施工等投诉增多，预计增长20%。\n\n【外部特定因素】\n\n1. 经济环境：受宏观经济波动影响，部分企业经营困难，导致劳资纠纷、合同纠纷等诉求增加。\n\n2. 社会事件：近期发生的公共事件可能引发相关领域的诉求集中爆发，需要密切关注舆情动态。\n\n3. 节假日效应：临近节假日，消费类投诉和旅游服务类诉求预计增长，需要提前做好预案。';
    } else if (period === 'month') {
        analysisContent = '【历史数据趋势】\n\n基于近一年同期月度数据分析，未来一个月诉求量将呈现明显的周期性波动。月初（1-5日）和月末（25-30日）是诉求高峰期，分别比月中增长约25%和30%。这种周期性规律与工资发放、账单结算等时间节点高度相关。\n\n【诉求类型变化】\n\n1. 年末拖欠薪资诉求增长：进入年末，企业面临资金回笼压力，拖欠薪资类诉求预计在12月达到峰值，增长幅度可达45-50%。主要集中在劳动密集型行业，需要劳动监察部门提前介入。\n\n2. 政策变动引发企业诉求变化：新政策实施初期，企业适应期通常为1-2个月，期间咨询类诉求会显著增加。特别是涉及税务、环保、安全生产等领域的政策调整，预计引发相关诉求增长30-35%。\n\n3. 季节性因素影响：冬季供暖、春节前消费等季节性因素，将导致相关诉求集中出现。供暖类投诉预计增长40%，消费类投诉预计增长35%。\n\n【外部特定因素】\n\n1. 经济环境：年末企业资金链紧张，可能导致更多经济纠纷和合同违约，相关诉求预计增长25%。\n\n2. 社会事件：重大社会事件或政策发布后，相关领域诉求会在1-2周内集中爆发，需要建立快速响应机制。\n\n3. 节假日效应：春节前是消费高峰期，相关投诉和纠纷预计增长，需要提前部署消费维权力量。';
    } else {
        analysisContent = '【历史数据趋势】\n\n通过对近三年同期季度数据的深度分析，发现第三季度是全年诉求高峰期，诉求量通常比第二季度增长约20-25%。这种趋势与夏季高温、企业年中调整、学生假期等因素密切相关。\n\n【诉求类型变化】\n\n1. 年末拖欠薪资诉求增长：第四季度是拖欠薪资类诉求的高发期，特别是在11-12月，增长幅度可达50-60%。这与企业年终结算、资金回笼周期有关，需要劳动保障部门重点关注制造业、建筑业等行业。\n\n2. 政策变动引发企业诉求变化：季度性政策调整（如税收政策、环保政策、产业政策等）通常会在政策发布后的1-3个月内引发大量企业咨询和投诉。预计相关诉求增长30-40%，需要加强政策解读和指导服务。\n\n3. 季节性因素影响：\n   - 夏季（第三季度）：高温导致环境类诉求增加，空调噪音、夜间施工等投诉增多。\n   - 冬季（第四季度）：供暖类诉求集中出现，预计增长45%。\n   - 节假日效应：国庆、春节等长假期间，消费类投诉和旅游服务类诉求显著增加。\n\n【外部特定因素】\n\n1. 经济环境：宏观经济波动直接影响企业运营，经济下行期劳资纠纷、合同纠纷等诉求明显增加。需要建立经济形势与诉求量的关联分析模型。\n\n2. 社会事件：重大社会事件（如安全事故、公共卫生事件等）会在短期内引发相关领域诉求集中爆发，影响周期通常为1-2个月。\n\n3. 区域发展：城市建设和区域发展规划会带来新的诉求类型和增长点，需要持续跟踪和分析。\n\n4. 行业周期：不同行业有各自的业务周期，如建筑业的施工旺季、零售业的销售旺季等，都会影响相关诉求的分布和数量。';
    }
    
    if (analysisGenerating) analysisGenerating.style.display = 'flex';
    if (analysisText) analysisText.style.display = 'none';
    
    typeWriterEffect(analysisText, analysisContent, analysisGenerating);
}

// 诉求多元化模块
function initPopulationPortrait() {
    const chartDom = document.getElementById('demandDiversityChart');
    if (!chartDom) return;
    
    // 定义4个诉求维度
    const demandTypes = [
        { name: '正向诉求', count: 0, color: '#51cf66', max: 100000 },
        { name: '无效诉求', count: 0, color: '#ffab4d', max: 50000 },
        { name: '敏感诉求', count: 0, color: '#ff6b6b', max: 30000 },
        { name: '疑难诉求', count: 0, color: '#7db8e6', max: 20000 }
    ];
    
    // 生成随机诉求数量
    demandTypes.forEach(type => {
        type.count = Math.floor(Math.random() * type.max * 0.8) + type.max * 0.2;
    });
    
    const chart = echarts.init(chartDom);
    
    // 初始化柱状图
    function updateChart() {
        const names = demandTypes.map(t => t.name);
        const counts = demandTypes.map(t => t.count);
        const colors = demandTypes.map(t => t.color);
        
        const option = {
            backgroundColor: 'transparent',
            grid: {
                left: '10%',
                right: '10%',
                top: '15%',
                bottom: '15%'
            },
            xAxis: {
                type: 'category',
                data: names,
                axisLine: {
                    lineStyle: {
                        color: '#7db8e6',
                        width: 2
                    }
                },
                axisLabel: {
                    color: '#ffffff',
                    fontSize: 14,
                    fontWeight: 'bold',
                    textShadow: '0 0 8px rgba(100, 180, 255, 0.8)',
                    margin: 12
                }
            },
            yAxis: {
                type: 'value',
                axisLine: {
                    lineStyle: {
                        color: '#7db8e6'
                    }
                },
                axisLabel: {
                    color: '#8db8d8',
                    fontSize: 9
                },
                splitLine: {
                    lineStyle: {
                        color: 'rgba(100, 180, 255, 0.1)'
                    }
                }
            },
            series: [{
                data: counts.map((count, index) => ({
                    value: count,
                    itemStyle: {
                        color: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [
                                { offset: 0, color: colors[index] },
                                { offset: 1, color: colors[index] + '80' }
                            ]
                        },
                        borderRadius: [4, 4, 0, 0],
                        shadowColor: colors[index],
                        shadowBlur: 15,
                        shadowOffsetY: 5
                    }
                })),
                type: 'bar',
                barWidth: '50%',
                label: {
                    show: true,
                    position: 'top',
                    color: '#ffffff',
                    fontSize: 11,
                    fontWeight: 'bold',
                    textShadow: '0 0 6px rgba(0, 0, 0, 0.8)',
                    formatter: function(params) {
                        return params.value.toLocaleString() + '件';
                    }
                },
                animation: true,
                animationDuration: 2000,
                animationEasing: 'elasticOut',
                animationDelay: function (idx) {
                    return idx * 200;
                }
            }]
        };
        
        chart.setOption(option);
        
        // 添加点击事件（每次更新时重新绑定）
        chart.off('click');
        chart.on('click', function(params) {
            const clickedType = demandTypes.find(t => t.name === params.name);
            if (clickedType) {
                openDemandDiversityModal(clickedType, demandTypes);
            }
        });
        
        // 设置图表可点击样式
        chart.getDom().style.cursor = 'pointer';
    }
    
        updateChart();
        
        // 保存chart实例和demandTypes
        chartDom._chart = chart;
        chartDom._demandTypes = demandTypes;
        
        // 初始化弹窗
        initDemandDiversityModal();
        
        // 定期更新数据（每30秒）
        setInterval(() => {
            demandTypes.forEach((type) => {
                const change = Math.floor(Math.random() * 200) - 100; // -100到+100的变化
                type.count = Math.max(1000, type.count + change);
            });
            
            // 更新时也使用动画
            chart.setOption({
                series: [{
                    animation: true,
                    animationDuration: 1500,
                    animationEasing: 'cubicOut',
                    animationDelay: function (idx) {
                        return idx * 150;
                    }
                }]
            });
            
            updateChart();
        }, 30000);
    
    // 响应式调整
    window.addEventListener('resize', () => {
        chart.resize();
    });
}

// 诉求多元化弹窗
function initDemandDiversityModal() {
    const modal = document.getElementById('demandDiversityModal');
    const closeBtn = document.getElementById('closeDemandDiversityModal');
    const overlay = modal?.querySelector('.modal-overlay');
    
    if (!modal) return;
    
    // 关闭按钮
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            closeDemandDiversityModal();
        });
    }
    
    // 点击遮罩层关闭
    if (overlay) {
        overlay.addEventListener('click', function() {
            closeDemandDiversityModal();
        });
    }
    
    // ESC键关闭
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeDemandDiversityModal();
        }
    });
}

function openDemandDiversityModal(clickedType, allTypes) {
    const modal = document.getElementById('demandDiversityModal');
    if (!modal) return;
    
    // 更新弹窗数据
    updateDemandDiversityModalData(clickedType, allTypes);
    
    // 显示弹窗
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeDemandDiversityModal() {
    const modal = document.getElementById('demandDiversityModal');
    if (!modal) return;
    
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

function updateDemandDiversityModalData(clickedType, allTypes) {
    // 更新标题
    const title = document.getElementById('demandDiversityModalTitle');
    if (title) {
        title.textContent = `${clickedType.name}详情分析`;
    }
    
    // 生成AI分析
    generateDemandDiversityAIAnalysis(clickedType, allTypes);
    
    // 生成数据统计
    generateDemandDiversityStats(clickedType, allTypes);
    
    // 生成诉求分类下钻
    generateDemandDiversityDrilldown(clickedType);
}

function generateDemandDiversityAIAnalysis(clickedType, allTypes) {
    const generatingElement = document.getElementById('demandDiversityAIGenerating');
    const analysisTextElement = document.getElementById('demandDiversityAIAnalysisText');
    
    if (!generatingElement || !analysisTextElement) return;
    
    // 显示生成中状态
    generatingElement.style.display = 'flex';
    analysisTextElement.style.display = 'none';
    analysisTextElement.innerHTML = '';
    
    const totalCount = allTypes.reduce((sum, type) => sum + type.count, 0);
    const percentage = ((clickedType.count / totalCount) * 100).toFixed(1);
    
    // 根据类型生成不同的分析
    let fullText = '';
    
    if (clickedType.name === '正向诉求') {
        fullText = `根据诉求多元化数据分析，当前${clickedType.name}数量为${clickedType.count.toLocaleString()}件，占总诉求的${percentage}%，是四类诉求中占比最高的类型。正向诉求反映了群众对政府服务的认可和满意，此类诉求通常涉及表扬、感谢、建议等积极反馈，高比例的正向诉求说明治理工作取得良好成效，群众满意度持续提升。从诉求内容来看，主要集中在服务态度、办事效率、政策落实等方面，说明政府在提升服务质量方面取得了显著成效。建议继续保持并优化服务，建立正向诉求激励机制鼓励更多群众参与治理，总结正向诉求中的优秀案例推广成功经验，将正向诉求转化为治理动力持续改进服务质量，同时建立反馈机制及时回应群众建议，进一步提升群众满意度。`;
    } else if (clickedType.name === '无效诉求') {
        fullText = `根据诉求多元化数据分析，当前${clickedType.name}数量为${clickedType.count.toLocaleString()}件，占总诉求的${percentage}%。无效诉求通常包括重复提交、信息不全、超出受理范围等情况，此类诉求需要及时识别和处理，避免占用过多资源影响正常诉求的处理效率。通过智能识别和引导，可以有效减少无效诉求的产生，提升诉求处理效率。从无效诉求的类型分布来看，重复提交和信息不全占比较高，说明需要加强诉求提交前的引导和校验。建议加强诉求提交前的智能校验减少无效诉求，优化诉求引导机制帮助群众正确提交诉求，建立无效诉求快速识别和处理机制，同时加强宣传引导，让群众了解诉求受理范围和提交要求。`;
    } else if (clickedType.name === '敏感诉求') {
        fullText = `根据诉求多元化数据分析，当前${clickedType.name}数量为${clickedType.count.toLocaleString()}件，占总诉求的${percentage}%。敏感诉求涉及社会稳定、舆情风险等重要问题，需要建立快速响应机制，及时处理和化解矛盾，此类诉求处理不当可能引发更大的社会问题。从敏感诉求的特征来看，主要集中在群体性事件、重大矛盾纠纷、舆情热点等方面，需要高度重视。建议建立敏感诉求预警机制提前识别风险，制定专项处理流程确保快速响应和妥善处理，加强跨部门协调形成处理合力，建立跟踪机制确保问题得到彻底解决，同时加强舆情监测和分析，及时掌握社会动态。`;
    } else if (clickedType.name === '疑难诉求') {
        fullText = `根据诉求多元化数据分析，当前${clickedType.name}数量为${clickedType.count.toLocaleString()}件，占总诉求的${percentage}%。疑难诉求通常涉及复杂问题，需要多部门协同处理，此类诉求处理周期较长，需要建立专门的工作机制。通过分类管理和专业处理，可以提高解决效率，确保问题得到妥善解决。从疑难诉求的类型来看，主要集中在历史遗留问题、跨部门协调事项、法律争议等方面，需要专业化的处理方式。建议建立疑难诉求分类管理机制按类型制定处理方案，加强跨部门协调形成处理合力，建立专家会商机制提高处理质量，定期跟踪处理进度确保问题得到解决，同时总结经验教训，不断完善处理机制。`;
    }
    
    // 延迟1秒后开始逐字显示
    setTimeout(() => {
        typeWriterEffect(analysisTextElement, fullText, generatingElement);
    }, 1000);
}

function generateDemandDiversityStats(clickedType, allTypes) {
    const statsContainer = document.getElementById('demandDiversityStats');
    if (!statsContainer) return;
    
    const totalCount = allTypes.reduce((sum, type) => sum + type.count, 0);
    const percentage = ((clickedType.count / totalCount) * 100).toFixed(1);
    
    // 计算同比和环比（模拟数据）
    const yearOverYear = (Math.random() * 10 - 5).toFixed(1); // -5% 到 +5%
    const monthOverMonth = (Math.random() * 8 - 4).toFixed(1); // -4% 到 +4%
    
    const statsHtml = `
        <div class="diversity-stat-card">
            <div class="stat-card-title">诉求总数</div>
            <div class="stat-card-value">${clickedType.count.toLocaleString()}件</div>
            <div class="stat-card-label">当前数量</div>
        </div>
        <div class="diversity-stat-card">
            <div class="stat-card-title">占比</div>
            <div class="stat-card-value">${percentage}%</div>
            <div class="stat-card-label">占总诉求比例</div>
        </div>
        <div class="diversity-stat-card">
            <div class="stat-card-title">同比变化</div>
            <div class="stat-card-value ${parseFloat(yearOverYear) >= 0 ? 'up' : 'down'}">${parseFloat(yearOverYear) >= 0 ? '+' : ''}${yearOverYear}%</div>
            <div class="stat-card-label">较去年同期</div>
        </div>
        <div class="diversity-stat-card">
            <div class="stat-card-title">环比变化</div>
            <div class="stat-card-value ${parseFloat(monthOverMonth) >= 0 ? 'up' : 'down'}">${parseFloat(monthOverMonth) >= 0 ? '+' : ''}${monthOverMonth}%</div>
            <div class="stat-card-label">较上月</div>
        </div>
    `;
    
    statsContainer.innerHTML = statsHtml;
}

function generateDemandDiversityDrilldown(clickedType) {
    const drilldownContainer = document.getElementById('demandDiversityDrilldown');
    if (!drilldownContainer) return;
    
    // 根据不同类型生成不同的下钻分类
    let categories = [];
    
    if (clickedType.name === '正向诉求') {
        categories = [
            { name: '表扬感谢', count: Math.floor(clickedType.count * 0.35), percentage: 35 },
            { name: '建议意见', count: Math.floor(clickedType.count * 0.30), percentage: 30 },
            { name: '服务评价', count: Math.floor(clickedType.count * 0.20), percentage: 20 },
            { name: '其他正向', count: Math.floor(clickedType.count * 0.15), percentage: 15 }
        ];
    } else if (clickedType.name === '无效诉求') {
        categories = [
            { name: '重复提交', count: Math.floor(clickedType.count * 0.40), percentage: 40 },
            { name: '信息不全', count: Math.floor(clickedType.count * 0.30), percentage: 30 },
            { name: '超出范围', count: Math.floor(clickedType.count * 0.20), percentage: 20 },
            { name: '其他无效', count: Math.floor(clickedType.count * 0.10), percentage: 10 }
        ];
    } else if (clickedType.name === '敏感诉求') {
        categories = [
            { name: '社会稳定', count: Math.floor(clickedType.count * 0.35), percentage: 35 },
            { name: '舆情风险', count: Math.floor(clickedType.count * 0.30), percentage: 30 },
            { name: '群体事件', count: Math.floor(clickedType.count * 0.20), percentage: 20 },
            { name: '其他敏感', count: Math.floor(clickedType.count * 0.15), percentage: 15 }
        ];
    } else if (clickedType.name === '疑难诉求') {
        categories = [
            { name: '跨部门协调', count: Math.floor(clickedType.count * 0.35), percentage: 35 },
            { name: '历史遗留', count: Math.floor(clickedType.count * 0.30), percentage: 30 },
            { name: '法律争议', count: Math.floor(clickedType.count * 0.20), percentage: 20 },
            { name: '其他疑难', count: Math.floor(clickedType.count * 0.15), percentage: 15 }
        ];
    }
    
    const drilldownHtml = `
        <div class="drilldown-list">
            ${categories.map(category => `
                <div class="drilldown-item">
                    <div class="drilldown-info">
                        <div class="drilldown-name">${category.name}</div>
                        <div class="drilldown-count">${category.count.toLocaleString()}件</div>
                    </div>
                    <div class="drilldown-bar">
                        <div class="drilldown-bar-fill" style="width: ${category.percentage}%; background: ${clickedType.color};"></div>
                    </div>
                    <div class="drilldown-percentage">${category.percentage}%</div>
                </div>
            `).join('')}
        </div>
    `;
    
    drilldownContainer.innerHTML = drilldownHtml;
}

// 地图标记点管理
let mapMarkers = [];

function initMapMarkers() {
    const mapContainer = document.getElementById('mapMarkers');
    const mapImage = document.getElementById('mapImage');
    
    if (!mapContainer) {
        console.error('mapMarkers container not found');
        return;
    }
    
    if (!mapImage) {
        console.error('mapImage not found');
        return;
    }
    
    // 立即创建标记点，不等待图片加载
    // 18个点位分散在整个中心高亮区域内（35%-62%范围，确保在可见区域内）
    const initialMarkers = [
        { x: 38, y: 38, type: 'high', count: 28, area: '市中区核心' },
        { x: 45, y: 35, type: 'high', count: 23, area: '市中区东' },
        { x: 40, y: 42, type: 'medium', count: 18, area: '市中区南' },
        { x: 50, y: 50, type: 'medium', count: 15, area: '薛城区中心' },
        { x: 57, y: 55, type: 'medium', count: 12, area: '薛城区西' },
        { x: 55, y: 58, type: 'medium', count: 14, area: '峄城区中心' },
        { x: 56, y: 56, type: 'low', count: 9, area: '峄城区北' },
        { x: 52, y: 58, type: 'low', count: 8, area: '台儿庄区中心' },
        { x: 54, y: 60, type: 'low', count: 7, area: '台儿庄区南' },
        { x: 42, y: 55, type: 'medium', count: 16, area: '山亭区中心' },
        { x: 58, y: 56, type: 'medium', count: 13, area: '山亭区西' },
        { x: 52, y: 38, type: 'high', count: 25, area: '滕州市中心' },
        { x: 59, y: 56, type: 'high', count: 22, area: '滕州市东' },
        { x: 45, y: 47, type: 'low', count: 10, area: '高新区' },
        { x: 57, y: 57, type: 'medium', count: 14, area: '经济开发区' },
        { x: 48, y: 42, type: 'medium', count: 11, area: '新城区' },
        { x: 44, y: 53, type: 'low', count: 9, area: '老城区' },
        { x: 55, y: 52, type: 'medium', count: 13, area: '工业园区' }
    ];
    
    console.log('Creating markers:', initialMarkers.length);
    console.log('Map container:', mapContainer);
    console.log('Map container dimensions:', mapContainer.offsetWidth, mapContainer.offsetHeight);
    
    // 清空现有标记点
    mapContainer.innerHTML = '';
    mapMarkers = [];
    
    initialMarkers.forEach((marker, index) => {
        setTimeout(() => {
            addMapMarker(marker.x, marker.y, marker.type, marker.count, marker.area);
        }, index * 50); // 延迟创建，便于调试
    });
    
    // 验证创建结果
    setTimeout(() => {
        const createdMarkers = mapContainer.querySelectorAll('.map-marker');
        console.log('Total markers created:', createdMarkers.length);
        createdMarkers.forEach((m, i) => {
            console.log(`Marker ${i}:`, m.style.left, m.style.top, m.style.display);
        });
    }, 1000);
}

// 添加地图标记点
function addMapMarker(xPercent, yPercent, type, count, area) {
    const mapContainer = document.getElementById('mapMarkers');
    if (!mapContainer) {
        console.error('mapMarkers container not found');
        return null;
    }
    
    console.log('Adding marker:', area, 'at', xPercent + '%', yPercent + '%', 'Container:', mapContainer);
    
    const marker = document.createElement('div');
    marker.className = 'map-marker';
    marker.setAttribute('data-area', area);
    marker.setAttribute('data-type', type);
    
    // 设置位置
    marker.style.cssText = `
        position: absolute !important;
        left: ${xPercent}% !important;
        top: ${yPercent}% !important;
        pointer-events: auto !important;
        display: block !important;
        visibility: visible !important;
        opacity: 1 !important;
    `;
    
    // 根据类型设置颜色（通过CSS变量）
    const colors = {
        high: '#ff5722',
        medium: '#ff9800',
        low: '#4caf50'
    };
    const shadows = {
        high: 'rgba(255, 87, 34, 0.8)',
        medium: 'rgba(255, 152, 0, 0.8)',
        low: 'rgba(76, 175, 80, 0.8)'
    };
    const color = colors[type] || '#7db8e6';
    const shadow = shadows[type] || 'rgba(125, 184, 230, 0.8)';
    marker.style.setProperty('--marker-color', color);
    marker.style.setProperty('--marker-shadow', shadow);
    
    // 添加脉冲环
    const pulseRing = document.createElement('div');
    pulseRing.className = 'pulse-ring';
    marker.appendChild(pulseRing);
    
    const tooltip = document.createElement('div');
    tooltip.className = 'map-marker-tooltip';
    tooltip.innerHTML = `
        <div>${area}</div>
        <div>预测诉求: ${count}件</div>
    `;
    marker.appendChild(tooltip);
    
    marker.addEventListener('click', function(e) {
        e.stopPropagation();
        console.log('区域详情:', area, '预测诉求:', count, '类型:', type);
    });
    
    mapContainer.appendChild(marker);
    mapMarkers.push(marker);
    
    console.log('Marker added successfully:', area, 'Total markers:', mapMarkers.length);
    
    // 验证标记点是否真的添加到了DOM
    const addedMarker = mapContainer.querySelector(`[data-area="${area}"]`);
    if (addedMarker) {
        console.log('Marker verified in DOM:', area);
    } else {
        console.error('Marker NOT found in DOM:', area);
    }
    
    return marker;
}

// 更新地图标记点位置（点击定位按钮时调用）
function updateMapMarkerPositions() {
    const mapContainer = document.getElementById('mapMarkers');
    if (!mapContainer) return;
    
    const existingMarkers = mapContainer.querySelectorAll('.map-marker');
    if (existingMarkers.length === 0) return;
    
    // 为每个标记生成新的随机位置（在35%-62%范围内，确保在可见区域内）
    existingMarkers.forEach((marker, index) => {
        // 生成新的随机位置
        const newX = 35 + Math.random() * 27; // 35% 到 62%
        const newY = 35 + Math.random() * 27; // 35% 到 62%
        
        // 添加过渡动画
        marker.style.transition = 'left 0.6s cubic-bezier(0.4, 0, 0.2, 1), top 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        
        // 延迟更新，创建错落有致的动画效果
        setTimeout(() => {
            marker.style.left = newX + '%';
            marker.style.top = newY + '%';
        }, index * 30); // 每个标记延迟30ms，形成波浪效果
    });
    
    // 动画完成后移除transition，避免影响其他操作
    setTimeout(() => {
        existingMarkers.forEach(marker => {
            marker.style.transition = '';
        });
    }, 1000);
}

// 更新地图标记点（根据预测数据）
function updateMapMarkers(predictedData, labels) {
    const mapContainer = document.getElementById('mapMarkers');
    if (!mapContainer) return;
    
    const existingMarkers = mapContainer.querySelectorAll('.map-marker');
    // 保留初始18个标记点，只更新额外添加的预测标记点
    if (existingMarkers.length > 18) {
        for (let i = 18; i < existingMarkers.length; i++) {
            existingMarkers[i].remove();
        }
    }
    
    // 确保所有标记点都在中心高亮区域内（35%-62%范围，确保在可见区域内）
    const regions = [
        { name: '市中区核心', x: 38, y: 38 },
        { name: '市中区东', x: 45, y: 35 },
        { name: '市中区南', x: 40, y: 42 },
        { name: '薛城区中心', x: 50, y: 50 },
        { name: '薛城区西', x: 57, y: 55 },
        { name: '峄城区中心', x: 55, y: 58 },
        { name: '峄城区北', x: 56, y: 56 },
        { name: '台儿庄区中心', x: 52, y: 58 },
        { name: '台儿庄区南', x: 54, y: 60 },
        { name: '山亭区中心', x: 42, y: 55 },
        { name: '山亭区西', x: 58, y: 56 },
        { name: '滕州市中心', x: 52, y: 38 },
        { name: '滕州市东', x: 59, y: 56 },
        { name: '高新区', x: 45, y: 47 },
        { name: '经济开发区', x: 57, y: 57 },
        { name: '新城区', x: 48, y: 42 },
        { name: '老城区', x: 44, y: 53 },
        { name: '工业园区', x: 55, y: 52 }
    ];
    
    // 为已有的标记点更新预测数据，或添加新的预测标记点
    regions.forEach((region, index) => {
        if (index >= 18) {
            // 如果有超过18个区域，可以添加额外的预测标记点
            const predictedCount = predictedData[index % predictedData.length];
            let type = 'low';
            if (predictedCount > 20) type = 'high';
            else if (predictedCount > 10) type = 'medium';
            
            addMapMarker(region.x, region.y, type, predictedCount, region.name);
        }
    });
}

// AI助手功能
function initAIAssistant() {
    const toggleBtn = document.getElementById('aiAssistantToggle');
    const panel = document.getElementById('aiAssistantPanel');
    const closeBtn = document.getElementById('aiCloseBtn');
    const sendBtn = document.getElementById('aiSendBtn');
    const aiInput = document.getElementById('aiInput');
    const chatContainer = document.getElementById('aiChatContainer');
    const suggestionChips = document.querySelectorAll('.chip');
    const digitalHuman = document.querySelector('.ai-digital-human');
    
    // 获取数字人位置（作为动画起点）
    function getDigitalHumanPosition() {
        if (!digitalHuman) {
            // 如果数字人不存在，使用AI助手按钮位置
            const container = document.querySelector('.ai-assistant-container');
            if (container) {
                const rect = container.getBoundingClientRect();
                return {
                    x: rect.left + rect.width / 2,
                    y: rect.top + rect.height / 2
                };
            }
            // 默认返回屏幕中心
            return {
                x: window.innerWidth / 2,
                y: window.innerHeight / 2
            };
        }
        const rect = digitalHuman.getBoundingClientRect();
        return {
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2
        };
    }
    
    // 打开面板（弹出动画）
    function openPanel() {
        if (!panel) return;
        
        // 显示遮罩层
        const overlay = document.getElementById('aiAssistantOverlay');
        if (overlay) {
            overlay.classList.add('active');
        }
        
        // 移除之前的动画类
        panel.classList.remove('panel-expanding', 'panel-collapsing', 'active');
        
        // 获取数字人位置
        const startPos = getDigitalHumanPosition();
        
        // 设置初始位置（从数字人位置开始）
        panel.style.left = startPos.x + 'px';
        panel.style.top = startPos.y + 'px';
        panel.style.transform = 'translate(-50%, -50%) scale(0.3)';
        panel.style.transformOrigin = 'center center';
        panel.style.opacity = '0';
        panel.style.visibility = 'visible';
        
        // 强制重排，确保初始状态生效
        panel.offsetHeight;
        
        // 添加弹出动画类
        panel.classList.add('panel-expanding');
        
        // 在动画进行中，平滑移动到屏幕中心
        let startTime = Date.now();
        const duration = 500; // 动画持续时间（毫秒）
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        
        function animate() {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // 使用平滑的缓动函数
            const easeProgress = 1 - Math.pow(1 - progress, 2);
            
            // 计算当前位置（从数字人位置到屏幕中心）
            const currentX = startPos.x + (centerX - startPos.x) * easeProgress;
            const currentY = startPos.y + (centerY - startPos.y) * easeProgress;
            
            panel.style.left = currentX + 'px';
            panel.style.top = currentY + 'px';
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                // 动画结束后，等待CSS动画也完成，然后设置最终状态
                setTimeout(() => {
                    panel.classList.remove('panel-expanding');
                    panel.classList.add('active');
                    // 确保最终位置和样式正确
                    panel.style.left = '50%';
                    panel.style.top = '50%';
                    panel.style.transform = 'translate(-50%, -50%) scale(1)';
                    panel.style.opacity = '1';
                    panel.style.visibility = 'visible';
                    // 移除所有可能冲突的内联样式
                    panel.style.transformOrigin = '';
                }, 500); // 等待CSS动画完成（500ms）
            }
        }
        
        requestAnimationFrame(animate);
    }
    
    // 关闭面板（收入动画）
    function closePanel() {
        if (!panel) return;
        
        // 隐藏遮罩层
        const overlay = document.getElementById('aiAssistantOverlay');
        if (overlay) {
            overlay.classList.remove('active');
        }
        
        // 移除之前的动画类
        panel.classList.remove('panel-expanding', 'active');
        
        // 获取数字人位置
        const endPos = getDigitalHumanPosition();
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        
        // 添加收入动画类
        panel.classList.add('panel-collapsing');
        
        // 在动画进行中，平滑移动到数字人位置
        let startTime = Date.now();
        const duration = 400; // 动画持续时间（毫秒）
        
        function animate() {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // 使用平滑的缓动函数
            const easeProgress = Math.pow(progress, 2);
            
            // 计算当前位置（从屏幕中心到数字人位置）
            const currentX = centerX + (endPos.x - centerX) * easeProgress;
            const currentY = centerY + (endPos.y - centerY) * easeProgress;
            
            panel.style.left = currentX + 'px';
            panel.style.top = currentY + 'px';
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                // 动画结束后，等待CSS动画也完成，然后隐藏面板
                setTimeout(() => {
                    panel.classList.remove('panel-collapsing');
                    panel.classList.remove('active');
                    panel.style.visibility = 'hidden';
                    panel.style.opacity = '0';
                    panel.style.left = '50%';
                    panel.style.top = '50%';
                    panel.style.transform = 'translate(-50%, -50%) scale(1)';
                    // 移除所有可能冲突的内联样式
                    panel.style.transformOrigin = '';
                }, 400); // 等待CSS动画完成（400ms）
            }
        }
        
        requestAnimationFrame(animate);
    }
    
    // 打开/关闭面板
    if (toggleBtn) {
        toggleBtn.addEventListener('click', function() {
            if (panel) {
                if (panel.classList.contains('active')) {
                    closePanel();
                } else {
                    openPanel();
                }
            }
        });
    }
    
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            if (panel) {
                closePanel();
            }
        });
    }
    
    // 发送消息
    function sendMessage() {
        const question = aiInput ? aiInput.value.trim() : '';
        if (!question) return;
        
        // 添加用户消息
        addMessage(question, 'user');
        aiInput.value = '';
        
        // 显示思考链
        const thinkingChain = generateThinkingChain(question);
        const thinkingDiv = document.createElement('div');
        thinkingDiv.className = 'ai-message-item ai thinking';
        thinkingDiv.innerHTML = `
            <div class="ai-thinking-chain">
                ${thinkingChain.map(step => `<div class="thinking-step">${step}</div>`).join('')}
            </div>
        `;
        const chatContainer = document.getElementById('aiChatContainer');
        if (chatContainer) {
            chatContainer.appendChild(thinkingDiv);
            chatContainer.scrollTop = chatContainer.scrollHeight;
        }
        
        // 生成时间（5-7秒随机）
        const generationTime = (Math.random() * 2 + 5).toFixed(1);
        
        // 模拟AI思考过程，逐步显示思考链
        let stepIndex = 0;
        const showThinkingStep = () => {
            if (stepIndex < thinkingChain.length) {
                const steps = thinkingDiv.querySelectorAll('.thinking-step');
                if (steps[stepIndex]) {
                    steps[stepIndex].classList.add('visible');
                }
                stepIndex++;
                setTimeout(showThinkingStep, 800);
            } else {
                // 思考链显示完成后，生成AI回复
                setTimeout(() => {
                    const response = generateAIResponse(question);
                    // 移除临时思考链容器，AI回复中会包含完整的思考链
                    thinkingDiv.remove();
                    // 添加AI回复（带思考链和生成时间）
                    addMessage(response.text, 'ai', response.type, response.data, thinkingChain, generationTime);
                }, 500);
            }
        };
        
        // 开始显示思考链
        setTimeout(showThinkingStep, 300);
    }
    
    if (sendBtn) {
        sendBtn.addEventListener('click', sendMessage);
    }
    
    if (aiInput) {
        aiInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
    
    // 建议问题点击
    suggestionChips.forEach(chip => {
        chip.addEventListener('click', function() {
            const question = this.getAttribute('data-question');
            if (aiInput && question) {
                aiInput.value = question;
                sendMessage();
            }
        });
    });
    
    // 开启新对话功能
    const newConversationBtn = document.getElementById('newConversationBtn');
    if (newConversationBtn) {
        newConversationBtn.addEventListener('click', function() {
            const chatContainer = document.getElementById('aiChatContainer');
            if (chatContainer) {
                // 保留欢迎消息，删除所有对话消息
                const welcomeDiv = chatContainer.querySelector('.ai-welcome');
                chatContainer.innerHTML = '';
                if (welcomeDiv) {
                    chatContainer.appendChild(welcomeDiv);
                }
                chatContainer.scrollTop = 0;
            }
        });
    }
}

// 添加消息到聊天容器
function addMessage(text, type, responseType, data, thinkingChain, generationTime) {
    const chatContainer = document.getElementById('aiChatContainer');
    if (!chatContainer) return;
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `ai-message-item ${type}`;
    
    if (type === 'ai') {
        // 构建消息内容容器，所有内容按上下顺序排列
        let contentParts = [];
        let messageId = null; // 用于文字逐步生成
        
        // 0. 添加思考链（如果有）- 始终显示，所有步骤都可见
        if (thinkingChain) {
            contentParts.push(`
                <div class="ai-thinking-chain">
                    ${thinkingChain.map(step => `<div class="thinking-step visible">${step}</div>`).join('')}
                </div>
            `);
        }
        
        // 1. 首先添加文本消息（逐步生成）
        if (generationTime && text) {
            messageId = 'aiMsg_' + Date.now();
            const timeDisplay = `<div class="generation-time">生成时间: ${generationTime}秒</div>`;
            contentParts.push(`<div class="ai-message"><div class="message-role">AI助手</div><div class="message-text" id="${messageId}"></div>${timeDisplay}</div>`);
        } else {
            const timeDisplay = generationTime ? `<div class="generation-time">生成时间: ${generationTime}秒</div>` : '';
            contentParts.push(`<div class="ai-message"><div class="message-role">AI助手</div><div class="message-text">${text}</div>${timeDisplay}</div>`);
        }
        
        // 2. 如果有图表数据，添加图表（逐步生成）
        if (responseType === 'chart' && data) {
            const chartId = 'aiChart_' + Date.now();
            const chartTimeDisplay = generationTime ? `<div class="generation-time">生成时间: ${generationTime}秒</div>` : '';
            contentParts.push(`
                <div class="ai-chart-wrapper" style="opacity: 0;">
                    <div class="ai-chart-header">
                        <div class="ai-chart-title">${data.title || '数据可视化'}</div>
                        <div class="ai-chart-controls">
                            <button class="ai-chart-style-btn active" data-chart="${chartId}" data-style="line">折线图</button>
                            <button class="ai-chart-style-btn" data-chart="${chartId}" data-style="bar">柱状图</button>
                            <button class="ai-chart-style-btn" data-chart="${chartId}" data-style="pie">饼图</button>
                            <button class="ai-chart-download-btn" data-chart="${chartId}" title="下载图表">⬇</button>
                        </div>
                    </div>
                    ${chartTimeDisplay}
                    <div class="ai-chart" id="${chartId}"></div>
                </div>
            `);
            
            // 保存图表信息到messageDiv，用于后续逐步生成
            if (!messageDiv.chartData) {
                messageDiv.chartData = [];
            }
            messageDiv.chartData.push({
                chartId: chartId,
                chartOption: data.chartOption,
                data: data,
                generationTime: generationTime
            });
        }
        
        // 3. 如果有分析数据，添加分析（逐步生成）
        if (data && data.analysis) {
            const analysisId = 'aiAnalysis_' + Date.now();
            contentParts.push(`
                <div class="ai-analysis" style="opacity: 0;">
                    <div class="ai-analysis-title">AI分析</div>
                    <div class="ai-analysis-content" id="${analysisId}"></div>
                </div>
            `);
            
            // 保存分析内容，用于后续逐步生成
            if (!messageDiv.analysisData) {
                messageDiv.analysisData = [];
            }
            messageDiv.analysisData.push({
                analysisId: analysisId,
                analysisText: data.analysis,
                generationTime: generationTime
            });
        }
        
        // 4. 如果有总结数据，添加总结（逐步生成）
        if (data && data.summary) {
            const summaryId = 'aiSummary_' + Date.now();
            contentParts.push(`
                <div class="ai-summary" style="opacity: 0;">
                    <div class="ai-summary-title">AI总结</div>
                    <div class="ai-summary-content" id="${summaryId}"></div>
                </div>
            `);
            
            // 保存总结内容，用于后续逐步生成
            if (!messageDiv.summaryData) {
                messageDiv.summaryData = [];
            }
            messageDiv.summaryData.push({
                summaryId: summaryId,
                summaryText: data.summary,
                generationTime: generationTime
            });
        }
        
        // 将所有内容按顺序组合，确保上下排列
        // 将头像和所有内容包裹在一个内容容器中
        messageDiv.innerHTML = `
            <div class="ai-message-content-wrapper">
                ${contentParts.join('')}
            </div>
        `;
        
        // 保存messageId和text到messageDiv，供后续使用
        if (messageId && text) {
            messageDiv.setAttribute('data-message-id', messageId);
            messageDiv.setAttribute('data-message-text', text);
        }
        
        // 逐步生成图表（在文字生成完成后）
        if (messageDiv.chartData && messageDiv.chartData.length > 0) {
            messageDiv.chartData.forEach((chartInfo, index) => {
                // 计算延迟时间：文字生成完成后，每个图表依次延迟
                const textDelay = generationTime ? parseFloat(generationTime) * 1000 + 500 : 2000;
                const chartDelay = textDelay + (index * 800);
                
                setTimeout(() => {
                    const chartWrapper = messageDiv.querySelector(`#${chartInfo.chartId}`)?.closest('.ai-chart-wrapper');
                    if (chartWrapper) {
                        // 显示图表容器
                        chartWrapper.style.opacity = '0';
                        chartWrapper.style.transition = 'opacity 0.5s ease';
                        
                        setTimeout(() => {
                            chartWrapper.style.opacity = '1';
                        }, 100);
                        
                        // 逐步渲染图表
                        setTimeout(() => {
                            const chartDom = document.getElementById(chartInfo.chartId);
                            if (chartDom && chartInfo.chartOption) {
                                // 复制图表配置，用于逐步动画
                                const originalOption = JSON.parse(JSON.stringify(chartInfo.chartOption));
                                
                                // 创建初始空配置
                                let initialOption = JSON.parse(JSON.stringify(originalOption));
                                if (initialOption.series && initialOption.series[0]) {
                                    // 将数据设为0或空数组
                                    const dataLength = initialOption.series[0].data ? initialOption.series[0].data.length : 0;
                                    if (Array.isArray(initialOption.series[0].data)) {
                                        initialOption.series[0].data = initialOption.series[0].data.map(() => 0);
                                    }
                                }
                                
                                const myChart = echarts.init(chartDom);
                                
                                // 先显示空图表
                                myChart.setOption(initialOption);
                                
                                // 然后逐步填充数据（使用动画）
                                setTimeout(() => {
                                    myChart.setOption(originalOption, true);
                                }, 300);
                                
                                // 保存图表实例和原始数据
                                window[chartInfo.chartId + '_instance'] = myChart;
                                window[chartInfo.chartId + '_data'] = chartInfo.data;
                                
                                // 添加样式切换功能
                                const styleBtns = document.querySelectorAll(`[data-chart="${chartInfo.chartId}"].ai-chart-style-btn`);
                                styleBtns.forEach(btn => {
                                    btn.addEventListener('click', function() {
                                        // 移除所有active类
                                        styleBtns.forEach(b => b.classList.remove('active'));
                                        this.classList.add('active');
                                        
                                        // 切换图表样式
                                        const style = this.getAttribute('data-style');
                                        const originalOption = chartInfo.chartOption;
                                        let newOption = JSON.parse(JSON.stringify(originalOption));
                            
                                        if (style === 'bar') {
                                            // 转换为柱状图
                                            if (newOption.series && newOption.series[0]) {
                                                newOption.series[0].type = 'bar';
                                                delete newOption.series[0].areaStyle;
                                                newOption.series[0].itemStyle = {
                                                    color: {
                                                        type: 'linear',
                                                        x: 0, y: 0, x2: 0, y2: 1,
                                                        colorStops: [
                                                            { offset: 0, color: '#7db8e6' },
                                                            { offset: 1, color: '#5a9bc4' }
                                                        ]
                                                    }
                                                };
                                            }
                                        } else if (style === 'pie') {
                                            // 转换为饼图
                                            const values = newOption.series[0].data.map((d, i) => ({
                                                value: typeof d === 'number' ? d : d.value || d,
                                                name: newOption.xAxis.data[i] || `项目${i+1}`
                                            }));
                                            newOption = {
                                                backgroundColor: 'transparent',
                                                tooltip: {
                                                    trigger: 'item',
                                                    textStyle: { color: '#ffffff' }
                                                },
                                                series: [{
                                                    type: 'pie',
                                                    radius: ['40%', '70%'],
                                                    data: values,
                                                    itemStyle: {
                                                        borderRadius: 10,
                                                        borderColor: '#0a0e1a',
                                                        borderWidth: 2
                                                    },
                                                    label: {
                                                        show: true,
                                                        color: '#8db8d8',
                                                        fontSize: 10
                                                    }
                                                }]
                                            };
                                        } else {
                                            // 恢复折线图
                                            newOption = originalOption;
                                        }
                                        
                                        myChart.setOption(newOption, true);
                                    });
                                });
                                
                                // 添加下载功能
                                const downloadBtn = document.querySelector(`[data-chart="${chartInfo.chartId}"].ai-chart-download-btn`);
                                if (downloadBtn) {
                                    downloadBtn.addEventListener('click', function() {
                                        const url = myChart.getDataURL({
                                            type: 'png',
                                            pixelRatio: 2,
                                            backgroundColor: '#0a0e1a'
                                        });
                                        const link = document.createElement('a');
                                        link.download = (chartInfo.data.title || 'chart') + '.png';
                                        link.href = url;
                                        link.click();
                                    });
                                }
                                
                                window.addEventListener('resize', () => {
                                    myChart.resize();
                                });
                            }
                        }, 300);
                    }
                }, chartDelay);
            });
        }
        
        // 逐步生成AI分析（在图表生成完成后）
        if (messageDiv.analysisData && messageDiv.analysisData.length > 0) {
            messageDiv.analysisData.forEach((analysisInfo, index) => {
                const textDelay = generationTime ? parseFloat(generationTime) * 1000 + 500 : 2000;
                const chartCount = messageDiv.chartData ? messageDiv.chartData.length : 0;
                const analysisDelay = textDelay + (chartCount * 1000) + (index * 1000);
                
                setTimeout(() => {
                    const analysisWrapper = messageDiv.querySelector(`#${analysisInfo.analysisId}`)?.closest('.ai-analysis');
                    if (analysisWrapper) {
                        // 显示分析容器
                        analysisWrapper.style.opacity = '0';
                        analysisWrapper.style.transition = 'opacity 0.5s ease';
                        setTimeout(() => {
                            analysisWrapper.style.opacity = '1';
                        }, 100);
                        
                        // 逐步显示文字（处理HTML内容）
                        const analysisElement = document.getElementById(analysisInfo.analysisId);
                        if (analysisElement) {
                            const totalDuration = analysisInfo.generationTime ? parseFloat(analysisInfo.generationTime) * 1000 : 3000;
                            
                            // 提取纯文本内容（去除HTML标签）
                            const tempDiv = document.createElement('div');
                            tempDiv.innerHTML = analysisInfo.analysisText;
                            const plainText = tempDiv.textContent || tempDiv.innerText || '';
                            
                            // 使用Array.from正确处理Unicode字符（包括中文）
                            const chars = Array.from(plainText);
                            const charsLength = chars.length;
                            const charDelay = Math.max(20, totalDuration / charsLength);
                            
                            let charIndex = 0;
                            const displayNextChar = () => {
                                if (charIndex < charsLength) {
                                    // 显示纯文本，逐步生成
                                    analysisElement.textContent = chars.slice(0, charIndex + 1).join('');
                                    charIndex++;
                                    if (charIndex < charsLength) {
                                        setTimeout(displayNextChar, charDelay);
                                    } else {
                                        // 生成完成后，替换为带HTML格式的内容
                                        setTimeout(() => {
                                            analysisElement.innerHTML = analysisInfo.analysisText;
                                        }, 200);
                                    }
                                }
                            };
                            
                            setTimeout(displayNextChar, 300);
                        }
                    }
                }, analysisDelay);
            });
        }
        
        // 逐步生成AI总结（在分析生成完成后）
        if (messageDiv.summaryData && messageDiv.summaryData.length > 0) {
            messageDiv.summaryData.forEach((summaryInfo, index) => {
                const textDelay = generationTime ? parseFloat(generationTime) * 1000 + 500 : 2000;
                const chartCount = messageDiv.chartData ? messageDiv.chartData.length : 0;
                const analysisCount = messageDiv.analysisData ? messageDiv.analysisData.length : 0;
                const summaryDelay = textDelay + (chartCount * 1000) + (analysisCount * 2000) + (index * 1000);
                
                setTimeout(() => {
                    const summaryWrapper = messageDiv.querySelector(`#${summaryInfo.summaryId}`)?.closest('.ai-summary');
                    if (summaryWrapper) {
                        // 显示总结容器
                        summaryWrapper.style.opacity = '0';
                        summaryWrapper.style.transition = 'opacity 0.5s ease';
                        setTimeout(() => {
                            summaryWrapper.style.opacity = '1';
                        }, 100);
                        
                        // 逐步显示文字（处理HTML内容）
                        const summaryElement = document.getElementById(summaryInfo.summaryId);
                        if (summaryElement) {
                            const totalDuration = summaryInfo.generationTime ? parseFloat(summaryInfo.generationTime) * 1000 : 3000;
                            
                            // 提取纯文本内容（去除HTML标签）
                            const tempDiv = document.createElement('div');
                            tempDiv.innerHTML = summaryInfo.summaryText;
                            const plainText = tempDiv.textContent || tempDiv.innerText || '';
                            
                            // 使用Array.from正确处理Unicode字符（包括中文）
                            const chars = Array.from(plainText);
                            const charsLength = chars.length;
                            const charDelay = Math.max(20, totalDuration / charsLength);
                            
                            let charIndex = 0;
                            const displayNextChar = () => {
                                if (charIndex < charsLength) {
                                    // 显示纯文本，逐步生成
                                    summaryElement.textContent = chars.slice(0, charIndex + 1).join('');
                                    charIndex++;
                                    if (charIndex < charsLength) {
                                        setTimeout(displayNextChar, charDelay);
                                    } else {
                                        // 生成完成后，替换为带HTML格式的内容
                                        setTimeout(() => {
                                            summaryElement.innerHTML = summaryInfo.summaryText;
                                        }, 200);
                                    }
                                }
                            };
                            
                            setTimeout(displayNextChar, 300);
                        }
                    }
                }, summaryDelay);
            });
        }
        
        // 将所有内容按顺序组合，确保上下排列
        // 将头像和所有内容包裹在一个内容容器中
        messageDiv.innerHTML = `
            <div class="ai-message-content-wrapper">
                ${contentParts.join('')}
            </div>
        `;
        
        // 保存messageId和text到messageDiv，供后续使用
        if (messageId && text) {
            messageDiv.setAttribute('data-message-id', messageId);
            messageDiv.setAttribute('data-message-text', text);
        }
    } else {
        messageDiv.innerHTML = `
            <div class="ai-message">
                <div class="message-role">用户</div>
                <div class="message-text">${text}</div>
            </div>
        `;
    }
    
    chatContainer.appendChild(messageDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight;
    
    // 如果是AI消息且有生成时间，逐步显示文字
    if (type === 'ai' && generationTime) {
        const savedMessageId = messageDiv.getAttribute('data-message-id');
        const savedText = messageDiv.getAttribute('data-message-text');
        
        if (savedMessageId && savedText) {
            setTimeout(() => {
                const textElement = messageDiv.querySelector(`#${savedMessageId}`);
                if (textElement) {
                    const totalDuration = parseFloat(generationTime) * 1000; // 转换为毫秒
                    const textLength = savedText.length;
                    const charDelay = Math.max(20, totalDuration / textLength);
                    
                    // 使用Array.from正确处理Unicode字符（包括中文）
                    const chars = Array.from(savedText);
                    const charsLength = chars.length;
                    let charIndex = 0;
                    const displayNextChar = () => {
                        if (charIndex < charsLength) {
                            textElement.textContent = chars.slice(0, charIndex + 1).join('');
                            charIndex++;
                            if (charIndex < charsLength) {
                                setTimeout(displayNextChar, charDelay);
                            }
                        }
                    };
                    
                    // 开始显示
                    displayNextChar();
                }
            }, 500);
        }
    }
}

// 生成思考链
function generateThinkingChain(question) {
    const lowerQuestion = question.toLowerCase();
    const steps = [];
    
    // 根据问题类型生成不同的思考步骤
    if (lowerQuestion.includes('区域') || lowerQuestion.includes('诉求') || lowerQuestion.includes('分布')) {
        steps.push('正在分析问题关键词...');
        steps.push('调取区域诉求数据...');
        steps.push('计算各区域诉求分布...');
        steps.push('生成可视化图表...');
        steps.push('分析趋势变化...');
    } else if (lowerQuestion.includes('预测') || lowerQuestion.includes('趋势')) {
        steps.push('正在理解预测需求...');
        steps.push('调取历史数据...');
        steps.push('运行预测模型...');
        steps.push('计算未来趋势...');
        steps.push('生成预测结果...');
    } else if (lowerQuestion.includes('分析') || lowerQuestion.includes('关系')) {
        steps.push('正在解析问题...');
        steps.push('调取相关数据...');
        steps.push('进行关联分析...');
        steps.push('计算相关性...');
        steps.push('生成分析报告...');
    } else {
        steps.push('正在理解您的问题...');
        steps.push('调取相关数据...');
        steps.push('分析数据特征...');
        steps.push('生成回答内容...');
    }
    
    return steps;
}

// 生成AI响应
function generateAIResponse(question) {
    const lowerQuestion = question.toLowerCase();
    
    // 复杂问题：区域诉求分布分析
    if (lowerQuestion.includes('区域') && (lowerQuestion.includes('诉求') || lowerQuestion.includes('分布'))) {
        return {
            text: '根据平台数据统计，我来为您详细分析最近一个月各区域的诉求分布情况：',
            type: 'chart',
            data: {
                title: '各区域诉求分布与趋势分析',
                chartOption: {
                    backgroundColor: 'transparent',
                    grid: {
                        left: '10%',
                        right: '10%',
                        top: '15%',
                        bottom: '15%'
                    },
                    xAxis: {
                        type: 'category',
                        data: ['市中区', '薛城区', '峄城区', '台儿庄区', '山亭区', '滕州市', '高新区'],
                        axisLine: { lineStyle: { color: '#7db8e6' } },
                        axisLabel: { color: '#8db8d8', fontSize: 10, rotate: 15 }
                    },
                    yAxis: {
                        type: 'value',
                        axisLine: { lineStyle: { color: '#7db8e6' } },
                        axisLabel: { color: '#8db8d8', fontSize: 10 },
                        splitLine: { lineStyle: { color: 'rgba(100, 180, 255, 0.1)' } }
                    },
                    series: [{
                        name: '诉求总量',
                        data: [1234, 987, 856, 523, 445, 1567, 678],
                        type: 'line',
                        smooth: true,
                        areaStyle: {
                            color: {
                                type: 'linear',
                                x: 0, y: 0, x2: 0, y2: 1,
                                colorStops: [
                                    { offset: 0, color: 'rgba(100, 180, 255, 0.3)' },
                                    { offset: 1, color: 'rgba(100, 180, 255, 0.05)' }
                                ]
                            }
                        },
                        lineStyle: { color: '#7db8e6', width: 2 },
                        itemStyle: { color: '#7db8e6' },
                        label: {
                            show: true,
                            position: 'top',
                            color: '#ffffff',
                            fontSize: 10
                        }
                    }, {
                        name: '环境类',
                        data: [456, 312, 234, 189, 156, 567, 234],
                        type: 'bar',
                        itemStyle: { color: '#5a9bc4' }
                    }, {
                        name: '民生类',
                        data: [389, 298, 267, 178, 134, 489, 198],
                        type: 'bar',
                        itemStyle: { color: '#4a8ab8' }
                    }, {
                        name: '管理类',
                        data: [389, 377, 355, 156, 155, 511, 246],
                        type: 'bar',
                        itemStyle: { color: '#3a7aac' }
                    }]
                },
                analysis: '通过对最近一个月的数据分析，我发现以下关键趋势：<br><br>1. <strong>总体分布特征</strong>：滕州市诉求量最高（1567件），占总量的24.5%，这与其作为人口最多的区域相符。市中区紧随其后（1234件），占比19.3%。薛城区和峄城区分别以987件和856件位列第三、四位。<br><br>2. <strong>问题类型分布</strong>：环境类问题占比最高（约38%），主要包括噪音污染、空气质量、垃圾处理等；民生类问题占比约32%，涉及教育、医疗、社保等；管理类问题占比约30%，主要包括城市管理、交通秩序等。<br><br>3. <strong>趋势变化</strong>：相比上月，各区域诉求量均有上升，平均增长率为12.3%。其中，高新区增长率最高（18.5%），可能与快速城市化发展有关。<br><br>4. <strong>区域特点</strong>：台儿庄区和山亭区诉求量相对较低，但在环境类问题上反映较为集中，需要重点关注生态保护和环境治理工作。',
                summary: '<strong>针对性治理建议：</strong><br>① 滕州市、市中区作为诉求高发区域，建议建立快速响应机制，优化资源配置，提升处理效率；<br>② 加强环境类问题的源头治理，建立跨部门协调机制；<br>③ 对于高新区等新兴区域，提前规划公共服务设施，避免问题积累；<br>④ 建立区域间经验共享平台，推广优秀治理案例；<br>⑤ 定期开展数据分析和趋势预测，实现从被动响应到主动治理的转变。'
            }
        };
    }
    
    // 复杂问题：民生善治指数预测
    if (lowerQuestion.includes('民生善治') && (lowerQuestion.includes('预测') || lowerQuestion.includes('趋势'))) {
        return {
            text: '基于历史数据和当前治理效果，我来为您预测未来一季度民生善治指数的变化趋势：',
            type: 'chart',
            data: {
                title: '民生善治指数预测分析',
                chartOption: {
                    backgroundColor: 'transparent',
                    grid: {
                        left: '10%',
                        right: '10%',
                        top: '15%',
                        bottom: '15%'
                    },
                    xAxis: {
                        type: 'category',
                        data: ['当前', '下月', '第二月', '第三月'],
                        axisLine: { lineStyle: { color: '#7db8e6' } },
                        axisLabel: { color: '#8db8d8', fontSize: 10 }
                    },
                    yAxis: {
                        type: 'value',
                        min: 80,
                        max: 95,
                        axisLine: { lineStyle: { color: '#7db8e6' } },
                        axisLabel: { color: '#8db8d8', fontSize: 10 },
                        splitLine: { lineStyle: { color: 'rgba(100, 180, 255, 0.1)' } }
                    },
                    series: [{
                        name: '历史数据',
                        data: [null, null, null, null],
                        type: 'line',
                        smooth: true,
                        lineStyle: { color: '#7db8e6', width: 2, type: 'dashed' },
                        itemStyle: { color: '#7db8e6' }
                    }, {
                        name: '预测数据',
                        data: [85.6, 87.2, 88.5, 89.8],
                        type: 'line',
                        smooth: true,
                        areaStyle: {
                            color: {
                                type: 'linear',
                                x: 0, y: 0, x2: 0, y2: 1,
                                colorStops: [
                                    { offset: 0, color: 'rgba(100, 180, 255, 0.3)' },
                                    { offset: 1, color: 'rgba(100, 180, 255, 0.05)' }
                                ]
                            }
                        },
                        lineStyle: { color: '#ff9800', width: 2 },
                        itemStyle: { color: '#ff9800' },
                        label: {
                            show: true,
                            position: 'top',
                            color: '#ffffff',
                            fontSize: 10
                        }
                    }]
                },
                analysis: '<strong>指数变化预测分析：</strong><br><br>1. <strong>整体趋势</strong>：未来三个月，民生善治指数预计将从当前的85.6分稳步上升至89.8分，累计提升4.2分，增长率约4.9%。这一预测基于当前治理机制的有效性和持续改进措施的实施。<br><br>2. <strong>关键影响因素</strong>：<br>• <strong>响应效率</strong>（权重35%）：预计从88%提升至91%，主要得益于智能化平台建设和流程优化；<br>• <strong>办理质量</strong>（权重28%）：预计从92%提升至94%，通过标准化管理和质量监督体系完善；<br>• <strong>群众满意度</strong>（权重22%）：预计从87%提升至90%，通过改善服务体验和加强沟通反馈；<br>• <strong>问题解决率</strong>（权重15%）：预计从90%提升至93%，通过提高协同能力和资源整合。<br><br>3. <strong>潜在风险点</strong>：<br>• 季节性因素可能影响环境类问题解决率；<br>• 重大节假日期间诉求量激增可能对响应效率造成压力；<br>• 新政策实施初期可能存在适应期，影响群众满意度。<br><br>4. <strong>提升路径</strong>：建议继续深化数据融合，加强跨部门协调，完善主动治理机制，建立更加精准的预测预警体系。',
                summary: '<strong>核心建议：</strong><br>① 保持当前治理体系稳定运行，同时持续优化关键环节；<br>② 重点关注响应效率和群众满意度两个提升空间较大的维度；<br>③ 建立季度评估机制，及时调整治理策略；<br>④ 加强与基层的联动，提升主动发现和解决问题的能力；<br>⑤ 利用AI技术进行更精准的趋势预测和问题诊断，实现数据驱动的智慧治理。'
            }
        };
    }
    
    // 诉求趋势相关（简化版）
    if (lowerQuestion.includes('诉求趋势') || lowerQuestion.includes('趋势')) {
        return {
            text: '根据数据分析，本周诉求趋势如下：',
            type: 'chart',
            data: {
                title: '本周诉求趋势分析',
                chartOption: {
                    backgroundColor: 'transparent',
                    grid: {
                        left: '10%',
                        right: '10%',
                        top: '15%',
                        bottom: '15%'
                    },
                    xAxis: {
                        type: 'category',
                        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
                        axisLine: { lineStyle: { color: '#7db8e6' } },
                        axisLabel: { color: '#8db8d8', fontSize: 10 }
                    },
                    yAxis: {
                        type: 'value',
                        axisLine: { lineStyle: { color: '#7db8e6' } },
                        axisLabel: { color: '#8db8d8', fontSize: 10 },
                        splitLine: { lineStyle: { color: 'rgba(100, 180, 255, 0.1)' } }
                    },
                    series: [{
                        data: [120, 132, 101, 134, 90, 230, 210],
                        type: 'line',
                        smooth: true,
                        areaStyle: {
                            color: {
                                type: 'linear',
                                x: 0, y: 0, x2: 0, y2: 1,
                                colorStops: [
                                    { offset: 0, color: 'rgba(100, 180, 255, 0.3)' },
                                    { offset: 1, color: 'rgba(100, 180, 255, 0.05)' }
                                ]
                            }
                        },
                        lineStyle: { color: '#7db8e6', width: 2 },
                        itemStyle: { color: '#7db8e6' }
                    }]
                },
                analysis: '从图表可以看出，本周诉求量呈现波动上升趋势。周一到周四相对平稳，周五开始下降，但周六达到峰值230件，周日回落至210件。整体来看，周末诉求量明显高于工作日，可能与居民休息时间集中反映问题有关。',
                summary: '建议重点关注周末时段的诉求处理能力，提前做好人员配置和资源调度，确保高峰期服务质量。同时，周五的下降趋势值得进一步分析，可能是工作流程优化的结果。'
            }
        };
    }
    
    // 区域投诉相关
    if (lowerQuestion.includes('区域') || lowerQuestion.includes('投诉最多')) {
        return {
            text: '根据最新数据统计，各区域投诉情况如下：',
            type: 'chart',
            data: {
                title: '各区域投诉分布',
                chartOption: {
                    backgroundColor: 'transparent',
                    tooltip: {
                        trigger: 'item',
                        textStyle: { color: '#ffffff' }
                    },
                    series: [{
                        type: 'pie',
                        radius: ['40%', '70%'],
                        avoidLabelOverlap: false,
                        itemStyle: {
                            borderRadius: 10,
                            borderColor: '#0a0e1a',
                            borderWidth: 2
                        },
                        label: {
                            show: true,
                            color: '#8db8d8',
                            fontSize: 10
                        },
                        labelLine: {
                            show: true,
                            lineStyle: { color: '#8db8d8' }
                        },
                        data: [
                            { value: 234, name: '市中区', itemStyle: { color: '#7db8e6' } },
                            { value: 189, name: '薛城区', itemStyle: { color: '#5a9bc4' } },
                            { value: 156, name: '峄城区', itemStyle: { color: '#4a8ab8' } },
                            { value: 98, name: '台儿庄区', itemStyle: { color: '#3a7aac' } },
                            { value: 67, name: '山亭区', itemStyle: { color: '#2a6a9c' } }
                        ]
                    }]
                },
                analysis: '从饼图分析可以看出，市中区投诉量最高（234件），占总投诉量的31.2%，这可能与该区域人口密度高、城市化程度高有关。薛城区和峄城区分别排名第二、三位，投诉量分别为189件和156件。台儿庄区和山亭区投诉量相对较少，可能与人口基数较小有关。',
                summary: '建议重点关注市中区的诉求处理，加强该区域的资源配置和问题响应速度。同时，可以总结台儿庄区和山亭区的优秀经验，推广到其他区域。'
            }
        };
    }
    
    // 复杂问题：督办效果与主动治理关系分析
    if (lowerQuestion.includes('督办') && lowerQuestion.includes('主动治理')) {
        return {
            text: '基于平台数据分析，我来详细分析督办效果与主动治理的协同关系：',
            type: 'chart',
            data: {
                title: '督办效果与主动治理协同分析',
                chartOption: {
                    backgroundColor: 'transparent',
                    grid: {
                        left: '10%',
                        right: '10%',
                        top: '15%',
                        bottom: '15%'
                    },
                    xAxis: {
                        type: 'category',
                        data: ['督办事项', '主动发现', '协同处理', '效果提升'],
                        axisLine: { lineStyle: { color: '#7db8e6' } },
                        axisLabel: { color: '#8db8d8', fontSize: 10 }
                    },
                    yAxis: {
                        type: 'value',
                        axisLine: { lineStyle: { color: '#7db8e6' } },
                        axisLabel: { color: '#8db8d8', fontSize: 10 },
                        splitLine: { lineStyle: { color: 'rgba(100, 180, 255, 0.1)' } }
                    },
                    series: [{
                        name: '督办事项数',
                        data: [1234, 856, 678, 523],
                        type: 'bar',
                        itemStyle: { color: '#7db8e6' },
                        label: {
                            show: true,
                            position: 'top',
                            color: '#ffffff',
                            fontSize: 10
                        }
                    }, {
                        name: '主动发现数',
                        data: [567, 890, 1234, 1456],
                        type: 'line',
                        smooth: true,
                        lineStyle: { color: '#ff9800', width: 2 },
                        itemStyle: { color: '#ff9800' },
                        label: {
                            show: true,
                            position: 'top',
                            color: '#ffffff',
                            fontSize: 10
                        }
                    }]
                },
                analysis: '<strong>督办效果与主动治理协同关系分析：</strong><br><br>1. <strong>数据对比分析</strong>：从图表可以看出，督办事项数量呈现下降趋势（从1234件降至523件），而主动发现事项数量呈上升趋势（从567件增至1456件）。这表明治理模式正在从被动响应向主动发现转变，主动治理机制发挥了显著作用。<br><br>2. <strong>协同效应评估</strong>：两者协同处理后的事项数量（678件）明显高于单独督办的数量，说明协同机制能够提高问题解决效率约35%。同时，效果提升维度显示，协同治理后的问题重复率下降了42%，群众满意度提升了15%。<br><br>3. <strong>影响机制分析</strong>：<br>• 督办机制通过建立责任体系和跟踪机制，确保问题得到及时解决；<br>• 主动治理通过数据分析和预测，提前发现潜在问题，减少问题积累；<br>• 两者的协同作用在于：督办确保主动发现的问题得到落实，主动治理为督办提供问题线索和数据支撑。<br><br>4. <strong>效能提升路径</strong>：建议建立督办-主动治理一体化平台，实现数据共享、任务协同、效果评估的全链条管理。同时，建立激励机制，鼓励基层主动发现和解决问题。',
                summary: '<strong>优化方案建议：</strong><br>① 建立督办-主动治理联动机制，实现数据互通和任务协同；<br>② 完善主动治理预警系统，提升问题发现的及时性和准确性；<br>③ 建立督办效果评估体系，将主动治理成效纳入督办考核；<br>④ 加强基层能力建设，提升主动治理意识和能力；<br>⑤ 定期开展协同效果评估，持续优化工作机制。'
            }
        };
    }
    
    // 复杂问题：重点人群与新业态人员对比分析
    if (lowerQuestion.includes('重点人群') && lowerQuestion.includes('新业态')) {
        return {
            text: '基于平台数据，我来对比分析重点人群与新业态人员的管理现状：',
            type: 'chart',
            data: {
                title: '重点人群与新业态人员管理对比分析',
                chartOption: {
                    backgroundColor: 'transparent',
                    tooltip: {
                        trigger: 'axis',
                        textStyle: { color: '#ffffff' }
                    },
                    legend: {
                        data: ['重点人群', '新业态人员'],
                        textStyle: { color: '#8db8d8', fontSize: 11 },
                        top: '5%'
                    },
                    grid: {
                        left: '10%',
                        right: '10%',
                        top: '20%',
                        bottom: '15%'
                    },
                    xAxis: {
                        type: 'category',
                        data: ['人口数量', '风险等级', '管理覆盖率', '服务满意度', '问题发现率'],
                        axisLine: { lineStyle: { color: '#7db8e6' } },
                        axisLabel: { color: '#8db8d8', fontSize: 10, rotate: 15 }
                    },
                    yAxis: {
                        type: 'value',
                        axisLine: { lineStyle: { color: '#7db8e6' } },
                        axisLabel: { color: '#8db8d8', fontSize: 10 },
                        splitLine: { lineStyle: { color: 'rgba(100, 180, 255, 0.1)' } }
                    },
                    series: [{
                        name: '重点人群',
                        data: [27491, 3.5, 92, 85, 8.5],
                        type: 'bar',
                        itemStyle: { color: '#7db8e6' },
                        label: {
                            show: true,
                            position: 'top',
                            color: '#ffffff',
                            fontSize: 9
                        }
                    }, {
                        name: '新业态人员',
                        data: [14713, 2.8, 78, 82, 6.2],
                        type: 'bar',
                        itemStyle: { color: '#ff9800' },
                        label: {
                            show: true,
                            position: 'top',
                            color: '#ffffff',
                            fontSize: 9
                        }
                    }]
                },
                analysis: '<strong>重点人群与新业态人员管理对比分析：</strong><br><br>1. <strong>人口规模对比</strong>：重点人群总数27491人，新业态人员14713人。重点人群主要包括老年人群（12345人）、未成年人（8901人）、残障人士（3456人）、困难家庭（2789人）等，人数相对固定；新业态人员包括网约车司机（5678人）、外卖配送员（4567人）、快递员（3234人）、网络主播（1234人）等，人数增长较快。<br><br>2. <strong>风险等级评估</strong>：重点人群平均风险等级3.5（1-5级，5级最高），新业态人员平均风险等级2.8。重点人群风险主要来自生活保障、健康医疗等方面；新业态人员风险主要来自就业稳定性、权益保障等方面。<br><br>3. <strong>管理现状对比</strong>：<br>• 管理覆盖率：重点人群92% vs 新业态人员78%，差距14个百分点；<br>• 服务满意度：重点人群85% vs 新业态人员82%，差距3个百分点；<br>• 问题发现率：重点人群8.5% vs 新业态人员6.2%，说明新业态人员问题发现机制有待加强。<br><br>4. <strong>潜在风险点识别</strong>：<br>• 重点人群：主要风险在于医疗健康、生活保障、心理关怀等方面，需要建立完善的保障体系；<br>• 新业态人员：主要风险在于就业稳定性、劳动权益、社会保障等方面，需要建立适应新业态特点的管理机制；<br>• 共同风险：都需要关注突发事件的应急管理能力。<br><br>5. <strong>差异化治理策略</strong>：<br>• 重点人群：建立"一人一档"精细化管理，加强日常关怀和定期走访；<br>• 新业态人员：建立"平台+个人"双轨管理，加强与平台企业的协作；<br>• 共同措施：建立统一的风险预警系统，实现数据共享和协同管理。',
                summary: '<strong>差异化治理策略建议：</strong><br>① 对于重点人群，建立更加完善的保障体系，重点关注生活保障、医疗健康、心理关怀等方面，提升管理覆盖率至95%以上；<br>② 对于新业态人员，建立适应新业态特点的管理机制，加强与平台企业的协作，提升管理覆盖率至85%以上；<br>③ 建立统一的风险预警系统，实现两类人群的数据共享和协同管理；<br>④ 加强问题发现机制建设，特别是新业态人员的问题发现能力；<br>⑤ 建立定期评估机制，及时调整治理策略，提升整体治理效能。'
            }
        };
    }
    
    // 督办效果相关（简化版）
    if (lowerQuestion.includes('督办') || lowerQuestion.includes('督办效果')) {
        return {
            text: '督办效果分析：',
            type: 'chart',
            data: {
                title: '督办效果趋势',
                chartOption: {
                    backgroundColor: 'transparent',
                    grid: {
                        left: '10%',
                        right: '10%',
                        top: '15%',
                        bottom: '15%'
                    },
                    xAxis: {
                        type: 'category',
                        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
                        axisLine: { lineStyle: { color: '#7db8e6' } },
                        axisLabel: { color: '#8db8d8', fontSize: 10 }
                    },
                    yAxis: {
                        type: 'value',
                        axisLine: { lineStyle: { color: '#7db8e6' } },
                        axisLabel: { color: '#8db8d8', fontSize: 10 },
                        splitLine: { lineStyle: { color: 'rgba(100, 180, 255, 0.1)' } }
                    },
                    series: [{
                        data: [120, 132, 101, 134, 90, 230, 210],
                        type: 'bar',
                        itemStyle: {
                            color: {
                                type: 'linear',
                                x: 0, y: 0, x2: 0, y2: 1,
                                colorStops: [
                                    { offset: 0, color: '#7db8e6' },
                                    { offset: 1, color: '#5a9bc4' }
                                ]
                            }
                        }
                    }]
                },
                analysis: '督办效果数据显示，本周督办事项总数为1,234件，已完成1,156件，完成率达到93.7%。从趋势图可以看出，工作日督办量相对稳定，周末督办量明显增加。整体完成率较高，说明督办机制运行良好。',
                summary: '督办工作整体效果良好，完成率超过90%。建议继续保持高效督办机制，同时关注周末时段的督办质量，确保高峰期服务质量不下降。'
            }
        };
    }
    
    // 默认响应
    return {
        text: '我理解您的问题。根据平台数据分析，我可以为您提供以下信息：\n\n1. 数据趋势分析\n2. 区域分布统计\n3. 指标评估报告\n4. 预测分析建议\n\n请尝试询问更具体的问题，例如："本周的诉求趋势如何？"或"哪个区域的投诉最多？"',
        type: 'text'
    };
}

// 响应式调整
window.addEventListener('resize', function() {
    if (window.predictionChart) {
        window.predictionChart.resize();
    }
    
    const charts = echarts.getInstanceByDom(document.getElementById('supervisionChart'));
    if (charts) charts.forEach(chart => chart.resize());
    
    const popCharts = echarts.getInstanceByDom(document.getElementById('populationChart'));
    if (popCharts) popCharts.forEach(chart => chart.resize());
    
    const formatCharts = echarts.getInstanceByDom(document.getElementById('formatChart'));
    if (formatCharts) formatCharts.forEach(chart => chart.resize());
    
    // 调整AI助手中的图表
    const aiCharts = document.querySelectorAll('.ai-chart');
    aiCharts.forEach(chartDom => {
        const chart = echarts.getInstanceByDom(chartDom);
        if (chart) chart.resize();
    });
});

// ==================== 柔性督办和主动治理工作台 ====================

// 存储推送的任务
let governanceTasks = [];

// 初始化柔性督办
function initFlexibleSupervision() {
    const closeBtn = document.getElementById('closeFlexibleSupervisionModal');
    const pushBtn = document.getElementById('pushToActiveGovernance');
    const scheduleBtn = document.getElementById('schedulePush');
    const modal = document.getElementById('flexibleSupervisionModal');
    
    if (closeBtn) {
        closeBtn.addEventListener('click', closeFlexibleSupervisionModal);
    }
    
    if (modal) {
        const overlay = modal.querySelector('.modal-overlay');
        if (overlay) {
            overlay.addEventListener('click', closeFlexibleSupervisionModal);
        }
        
        // 监听频率选择变化
        const frequencyRadios = modal.querySelectorAll('input[name="frequency"]');
        frequencyRadios.forEach(radio => {
            radio.addEventListener('change', function() {
                updateFrequencyOptionStyles();
            });
        });
    }
    
    if (pushBtn) {
        pushBtn.addEventListener('click', function() {
            pushToActiveGovernance(false);
        });
    }
    
    if (scheduleBtn) {
        scheduleBtn.addEventListener('click', function() {
            pushToActiveGovernance(true);
        });
    }
}

// 更新频率选择样式
function updateFrequencyOptionStyles() {
    const modal = document.getElementById('flexibleSupervisionModal');
    if (!modal) return;
    
    const frequencyOptions = modal.querySelectorAll('.frequency-option');
    frequencyOptions.forEach(option => {
        const radio = option.querySelector('input[type="radio"]');
        if (radio && radio.checked) {
            option.style.background = 'rgba(100, 180, 255, 0.15)';
            option.style.borderColor = 'rgba(100, 180, 255, 0.6)';
        } else {
            option.style.background = 'rgba(100, 180, 255, 0.05)';
            option.style.borderColor = 'rgba(100, 180, 255, 0.3)';
        }
    });
}

// 打开柔性督办弹窗
function openFlexibleSupervisionModal() {
    const modal = document.getElementById('flexibleSupervisionModal');
    if (!modal) return;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // 生成数据分析结果摘要
    generateDataSummary();
    
    // 生成推送单位列表
    generateUnitSelectionList();
    
    // 默认收起所有内容
    const summaryContent = document.getElementById('dataSummaryContent');
    const collapseBtn = document.getElementById('summaryCollapseBtn');
    if (summaryContent && collapseBtn) {
        summaryContent.classList.add('collapsed');
        collapseBtn.textContent = '▶';
        collapseBtn.title = '展开';
        collapseBtn.classList.add('collapsed');
    }
    
    // 收起所有区域下的街道列表
    setTimeout(() => {
        const regionGroups = document.querySelectorAll('.unit-region-group');
        regionGroups.forEach(group => {
            const streetsList = group.querySelector('.unit-streets-list');
            const collapseBtn = group.querySelector('.region-collapse-btn');
            if (streetsList && collapseBtn) {
                streetsList.classList.add('collapsed');
                collapseBtn.textContent = '▶';
            }
        });
    }, 100);
    
    // 初始化频率选择样式
    setTimeout(() => {
        updateFrequencyOptionStyles();
    }, 100);
    
    // 初始化数据分析摘要收起按钮
    initSummaryCollapseBtn();
}

// 初始化数据分析摘要收起按钮
function initSummaryCollapseBtn() {
    const collapseBtn = document.getElementById('summaryCollapseBtn');
    const summaryContent = document.getElementById('dataSummaryContent');
    
    if (collapseBtn && summaryContent) {
        collapseBtn.addEventListener('click', function() {
            const isCollapsed = summaryContent.classList.contains('collapsed');
            
            if (isCollapsed) {
                summaryContent.classList.remove('collapsed');
                this.textContent = '▼';
                this.title = '收起';
                this.classList.remove('collapsed');
            } else {
                summaryContent.classList.add('collapsed');
                this.textContent = '▶';
                this.title = '展开';
                this.classList.add('collapsed');
            }
        });
    }
}

// 关闭柔性督办弹窗
function closeFlexibleSupervisionModal() {
    const modal = document.getElementById('flexibleSupervisionModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// 生成数据分析结果摘要
function generateDataSummary() {
    const container = document.getElementById('dataSummaryContent');
    if (!container) return;
    
    const regions = ['市中区', '薛城区', '峄城区', '台儿庄区', '山亭区', '滕州市'];
    const issueTypes = ['环境噪音', '道路积水', '垃圾清理', '停车位', '公共设施', '物业管理', '邻里纠纷', '安全隐患'];
    
    let html = '';
    
    // 1. 每日诉求概览
    html += '<div class="summary-category">';
    html += '<div class="summary-category-title">📊 每日诉求概览</div>';
    html += '<div class="summary-category-description">基于今日数据统计，反映当前最紧迫的民生问题</div>';
    html += '<div class="summary-category-content">';
    
    const dailyTotal = Math.floor(Math.random() * 500) + 300;
    html += `<div class="summary-stat-item"><span class="stat-label">今日总诉求量：</span><span class="stat-value">${dailyTotal}起</span></div>`;
    
    html += '<div class="summary-detail-list">';
    issueTypes.slice(0, 5).forEach((issue, index) => {
        const count = Math.floor(Math.random() * 80) + 20;
        const percentage = ((count / dailyTotal) * 100).toFixed(1);
        html += `<div class="summary-detail-item">
            <span class="detail-name">${issue}问题</span>
            <span class="detail-count">${count}起 (${percentage}%)</span>
        </div>`;
    });
    html += '</div>';
    
    html += '<div class="summary-note">说明：今日诉求主要集中在环境治理和基础设施维护方面，建议重点关注高频问题区域。</div>';
    html += '</div></div>';
    
    // 2. 每周诉求概览
    html += '<div class="summary-category">';
    html += '<div class="summary-category-title">📈 每周诉求概览</div>';
    html += '<div class="summary-category-description">过去7天的诉求趋势分析，识别周期性问题和变化规律</div>';
    html += '<div class="summary-category-content">';
    
    const weeklyTotal = Math.floor(Math.random() * 3000) + 2000;
    html += `<div class="summary-stat-item"><span class="stat-label">本周总诉求量：</span><span class="stat-value">${weeklyTotal}起</span></div>`;
    html += `<div class="summary-stat-item"><span class="stat-label">日均诉求量：</span><span class="stat-value">${Math.floor(weeklyTotal / 7)}起</span></div>`;
    
    html += '<div class="summary-detail-list">';
    regions.forEach((region, index) => {
        const count = Math.floor(Math.random() * 400) + 200;
        const percentage = ((count / weeklyTotal) * 100).toFixed(1);
        const topIssue = issueTypes[index % issueTypes.length];
        html += `<div class="summary-detail-item">
            <span class="detail-name">${region}</span>
            <span class="detail-count">${count}起 (${percentage}%)</span>
            <span class="detail-issue">主要问题：${topIssue}</span>
        </div>`;
    });
    html += '</div>';
    
    html += '<div class="summary-note">说明：本周诉求较上周增长约5.2%，其中环境类问题占比最高，建议加强环境治理力度。</div>';
    html += '</div></div>';
    
    // 3. 每季度诉求概览
    html += '<div class="summary-category">';
    html += '<div class="summary-category-title">📋 每季度诉求概览</div>';
    html += '<div class="summary-category-description">本季度（3个月）的诉求综合分析，识别长期性问题和治理重点</div>';
    html += '<div class="summary-category-content">';
    
    const quarterlyTotal = Math.floor(Math.random() * 35000) + 25000;
    html += `<div class="summary-stat-item"><span class="stat-label">本季度总诉求量：</span><span class="stat-value">${quarterlyTotal.toLocaleString()}起</span></div>`;
    html += `<div class="summary-stat-item"><span class="stat-label">月均诉求量：</span><span class="stat-value">${Math.floor(quarterlyTotal / 3).toLocaleString()}起</span></div>`;
    
    html += '<div class="summary-detail-list">';
    issueTypes.forEach((issue, index) => {
        const count = Math.floor(Math.random() * 4000) + 2000;
        const percentage = ((count / quarterlyTotal) * 100).toFixed(1);
        html += `<div class="summary-detail-item">
            <span class="detail-name">${issue}问题</span>
            <span class="detail-count">${count.toLocaleString()}起 (${percentage}%)</span>
        </div>`;
    });
    html += '</div>';
    
    html += '<div class="summary-note">说明：本季度诉求总量较上季度下降3.8%，治理效果显著。但基础设施类问题仍需持续关注。</div>';
    html += '</div></div>';
    
    // 4. 预测诉求高发区域
    html += '<div class="summary-category">';
    html += '<div class="summary-category-title">🔮 预测诉求高发区域</div>';
    html += '<div class="summary-category-description">基于历史数据和趋势分析，预测未来可能出现的诉求高发区域和问题类型</div>';
    html += '<div class="summary-category-content">';
    
    html += '<div class="summary-prediction-list">';
    const predictionRegions = ['市中区-中心街街道', '薛城区-临城街道', '峄城区-坛山街道', '台儿庄区-运河街道', '滕州市-龙泉街道'];
    predictionRegions.forEach((region, index) => {
        const riskLevel = ['高', '中', '高', '中', '高'][index];
        const riskColor = riskLevel === '高' ? '#ff6b6b' : '#ffa94d';
        const predictedIssue = issueTypes[index % issueTypes.length];
        const predictedCount = Math.floor(Math.random() * 50) + 30;
        html += `<div class="summary-prediction-item">
            <div class="prediction-header">
                <span class="prediction-region">${region}</span>
                <span class="prediction-risk" style="color: ${riskColor};">风险等级：${riskLevel}</span>
            </div>
            <div class="prediction-details">
                <span class="prediction-issue">预测问题：${predictedIssue}</span>
                <span class="prediction-count">预计诉求量：${predictedCount}起/周</span>
            </div>
        </div>`;
    });
    html += '</div>';
    
    html += '<div class="summary-note">说明：基于AI算法和历史数据预测，建议提前部署治理资源，重点关注高风险区域，采取预防性治理措施。</div>';
    html += '</div></div>';
    
    container.innerHTML = html;
}

// 生成推送单位列表
function generateUnitSelectionList() {
    const container = document.getElementById('unitSelectionList');
    if (!container) return;
    
    const regionFilter = document.getElementById('regionFilter');
    if (!regionFilter) return;
    
    let html = '';
    
    // 定义完整的区-街镇结构
    const regionStructure = {
        '市中区': ['中心街街道', '赛瓦街道', '文化路街道', '东方红街道', '和兴街道', '东湖街道', '龙山街道', '通源街道', '西王庄镇', '齐村镇', '陶庄镇', '孟庄镇'],
        '薛城区': ['临城街道', '沙沟镇', '周营镇', '常庄镇', '陶庄镇', '张范镇'],
        '峄城区': ['坛山街道', '吴林街道', '曹庄街道', '峄城镇', '吴家镇', '官庄村', '谢庄镇', '古邵镇', '阴平镇'],
        '台儿庄区': ['运河街道', '马兰屯镇', '泥沟镇', '张山子镇', '山亭镇', '涧头集镇'],
        '山亭区': ['山城街道', '冯卯镇', '城头镇', '店子镇', '徐庄镇', '北庄镇', '桑村镇', '水泉镇', '西集镇'],
        '滕州市': ['龙泉街道', '荆河街道', '北辛街道', '善南街道', '东沙河镇', '郭庄镇', '龙阳镇', '界河镇', '官桥镇', '西岗镇', '姜屯镇', '鲍沟镇', '大坞镇', '滨湖镇', '南沙河镇', '级索镇', '木石镇', '羊庄镇', '张汪镇', '洪绪镇']
    };
    
    // 尝试从地区选择器获取结构
    const optgroups = regionFilter.querySelectorAll('optgroup');
    if (optgroups.length > 0) {
        optgroups.forEach(optgroup => {
            const regionName = optgroup.label;
            const streets = [];
            optgroup.querySelectorAll('option').forEach(option => {
                streets.push(option.textContent.trim());
            });
            
            if (regionName && streets.length > 0) {
                // 区级选项
                const regionId = regionName.replace(/\s+/g, '_');
                html += `<div class="unit-region-group" data-region="${regionName}">
                    <div class="unit-region-header">
                        <input type="checkbox" class="region-checkbox" id="region_${regionId}" data-region="${regionName}">
                        <label for="region_${regionId}" class="region-label">${regionName}</label>
                        <div class="region-actions">
                            <button class="region-select-all-btn" data-region="${regionName}" title="一键全选该区所有街镇">全选</button>
                            <button class="region-collapse-btn" data-region="${regionName}" title="收起/展开">▼</button>
                        </div>
                    </div>
                    <div class="unit-streets-list" data-region="${regionName}">`;
                
                // 街镇选项
                streets.forEach(street => {
                    const uniqueId = `unit_${regionName}_${street}`.replace(/\s+/g, '_');
                    html += `<div class="unit-checkbox-item unit-street-item">
                        <input type="checkbox" class="street-checkbox" id="${uniqueId}" value="${street}" data-region="${regionName}">
                        <label for="${uniqueId}">${street}</label>
                    </div>`;
                });
                
                html += '</div></div>';
            }
        });
    } else {
        // 如果没有找到optgroup，使用默认结构
        Object.keys(regionStructure).forEach(regionName => {
            const streets = regionStructure[regionName];
            const regionId = regionName.replace(/\s+/g, '_');
            
            html += `<div class="unit-region-group" data-region="${regionName}">
                <div class="unit-region-header">
                    <input type="checkbox" class="region-checkbox" id="region_${regionId}" data-region="${regionName}">
                    <label for="region_${regionId}" class="region-label">${regionName}</label>
                    <div class="region-actions">
                        <button class="region-select-all-btn" data-region="${regionName}" title="一键全选该区所有街镇">全选</button>
                        <button class="region-collapse-btn" data-region="${regionName}" title="收起/展开">▼</button>
                    </div>
                </div>
                <div class="unit-streets-list" data-region="${regionName}">`;
            
            streets.forEach(street => {
                const uniqueId = `unit_${regionName}_${street}`.replace(/\s+/g, '_');
                html += `<div class="unit-checkbox-item unit-street-item">
                    <input type="checkbox" class="street-checkbox" id="${uniqueId}" value="${street}" data-region="${regionName}">
                    <label for="${uniqueId}">${street}</label>
                </div>`;
            });
            
            html += '</div></div>';
        });
    }
    
    container.innerHTML = html;
    
    // 绑定区级复选框事件（选择区时，自动选择该区下所有街镇）
    container.querySelectorAll('.region-checkbox').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const region = this.dataset.region;
            const streetCheckboxes = container.querySelectorAll(`.street-checkbox[data-region="${region}"]`);
            streetCheckboxes.forEach(streetCheckbox => {
                streetCheckbox.checked = this.checked;
            });
            updateSelectAllButton();
        });
    });
    
    // 绑定街镇复选框事件（当所有街镇都被选中时，自动选中区级）
    container.querySelectorAll('.street-checkbox').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const region = this.dataset.region;
            const regionCheckbox = container.querySelector(`.region-checkbox[data-region="${region}"]`);
            const streetCheckboxes = container.querySelectorAll(`.street-checkbox[data-region="${region}"]`);
            const allChecked = Array.from(streetCheckboxes).every(cb => cb.checked);
            if (regionCheckbox) {
                regionCheckbox.checked = allChecked;
            }
            updateSelectAllButton();
        });
    });
    
    // 绑定全选按钮
    const selectAllBtn = document.getElementById('selectAllUnits');
    if (selectAllBtn) {
        selectAllBtn.addEventListener('click', function() {
            const allCheckboxes = container.querySelectorAll('input[type="checkbox"]');
            const allChecked = Array.from(allCheckboxes).every(cb => cb.checked);
            
            allCheckboxes.forEach(checkbox => {
                checkbox.checked = !allChecked;
            });
            
            updateSelectAllButton();
        });
    }
    
    // 绑定区级一键全选按钮
    container.querySelectorAll('.region-select-all-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const region = this.dataset.region;
            const streetCheckboxes = container.querySelectorAll(`.street-checkbox[data-region="${region}"]`);
            const allChecked = Array.from(streetCheckboxes).every(cb => cb.checked);
            
            // 切换选中状态
            streetCheckboxes.forEach(checkbox => {
                checkbox.checked = !allChecked;
            });
            
            // 更新区级复选框状态
            const regionCheckbox = container.querySelector(`.region-checkbox[data-region="${region}"]`);
            if (regionCheckbox) {
                regionCheckbox.checked = !allChecked;
            }
            
            // 更新按钮文本
            updateRegionSelectAllButton(this, region);
            updateSelectAllButton();
        });
    });
    
    // 绑定区级收起按钮
    container.querySelectorAll('.region-collapse-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const region = this.dataset.region;
            const streetsList = container.querySelector(`.unit-streets-list[data-region="${region}"]`);
            
            if (streetsList) {
                const isCollapsed = streetsList.classList.contains('collapsed');
                if (isCollapsed) {
                    streetsList.classList.remove('collapsed');
                    this.textContent = '▼';
                    this.title = '收起';
                } else {
                    streetsList.classList.add('collapsed');
                    this.textContent = '▶';
                    this.title = '展开';
                }
            }
        });
    });
    
    // 初始化全选按钮文本和区级按钮文本
    updateSelectAllButton();
    container.querySelectorAll('.region-select-all-btn').forEach(btn => {
        updateRegionSelectAllButton(btn, btn.dataset.region);
    });
}

// 更新区级全选按钮文本
function updateRegionSelectAllButton(btn, region) {
    if (!btn || !region) return;
    
    const container = document.getElementById('unitSelectionList');
    if (!container) return;
    
    const streetCheckboxes = container.querySelectorAll(`.street-checkbox[data-region="${region}"]`);
    const allChecked = Array.from(streetCheckboxes).every(cb => cb.checked);
    
    btn.textContent = allChecked ? '取消全选' : '全选';
}

// 更新全选按钮文本
function updateSelectAllButton() {
    const selectAllBtn = document.getElementById('selectAllUnits');
    if (!selectAllBtn) return;
    
    const container = document.getElementById('unitSelectionList');
    if (!container) return;
    
    const allCheckboxes = container.querySelectorAll('input[type="checkbox"]');
    const allChecked = Array.from(allCheckboxes).every(cb => cb.checked);
    
    selectAllBtn.textContent = allChecked ? '取消全选' : '一键全选';
}

// 推送到主动治理工作台
function pushToActiveGovernance(isScheduled) {
    const modal = document.getElementById('flexibleSupervisionModal');
    if (!modal) return;
    
    // 获取选中的单位（包括区级和街镇）
    const selectedUnits = [];
    const selectedRegions = [];
    
    // 获取选中的区级
    const regionCheckboxes = modal.querySelectorAll('.region-checkbox:checked');
    regionCheckboxes.forEach(checkbox => {
        const regionName = checkbox.dataset.region;
        if (regionName) {
            selectedRegions.push(regionName);
        }
    });
    
    // 获取选中的街镇
    const streetCheckboxes = modal.querySelectorAll('.street-checkbox:checked');
    streetCheckboxes.forEach(checkbox => {
        const streetName = checkbox.value;
        const regionName = checkbox.dataset.region;
        if (streetName) {
            // 如果该区已全选，则显示为"区名（全部）"，否则显示具体街镇
            const regionCheckbox = modal.querySelector(`.region-checkbox[data-region="${regionName}"]`);
            if (regionCheckbox && regionCheckbox.checked) {
                // 区已全选，不重复添加街镇
            } else {
                selectedUnits.push(`${regionName}-${streetName}`);
            }
        }
    });
    
    // 合并区级和街镇
    selectedRegions.forEach(region => {
        selectedUnits.push(`${region}（全部）`);
    });
    
    if (selectedUnits.length === 0) {
        alert('请至少选择一个推送单位');
        return;
    }
    
    // 获取推送频率
    const frequencyRadio = modal.querySelector('input[name="frequency"]:checked');
    const frequency = frequencyRadio ? frequencyRadio.value : 'daily';
    const frequencyText = frequency === 'daily' ? '日' : frequency === 'weekly' ? '周' : '季度';
    
    // 获取数据分析摘要
    const summaryContent = document.getElementById('dataSummaryContent');
    const summary = summaryContent ? summaryContent.textContent : '';
    
    // 创建任务对象
    const task = {
        id: Date.now(),
        summary: summary,
        units: selectedUnits,
        frequency: frequencyText,
        frequencyValue: frequency,
        isScheduled: isScheduled,
        createTime: new Date().toLocaleString('zh-CN'),
        scheduledTime: isScheduled ? getScheduledTime(frequency) : null
    };
    
    // 添加到任务列表
    governanceTasks.push(task);
    
    // 更新主动治理工作台
    updateActiveGovernanceWorkbench();
    
    // 关闭弹窗
    closeFlexibleSupervisionModal();
    
    // 显示提示
    const message = isScheduled ? `已设置定时推送，将在${task.scheduledTime}推送至主动治理工作台` : '已成功推送至主动治理工作台';
    alert(message);
}

// 获取定时推送时间
function getScheduledTime(frequency) {
    const now = new Date();
    let scheduledDate = new Date();
    
    if (frequency === 'daily') {
        scheduledDate.setDate(now.getDate() + 1);
        scheduledDate.setHours(9, 0, 0, 0);
    } else if (frequency === 'weekly') {
        const daysUntilNextWeek = 7 - now.getDay() + 1;
        scheduledDate.setDate(now.getDate() + daysUntilNextWeek);
        scheduledDate.setHours(9, 0, 0, 0);
    } else if (frequency === 'quarterly') {
        const currentMonth = now.getMonth();
        const nextQuarterMonth = Math.floor(currentMonth / 3) * 3 + 3;
        scheduledDate.setMonth(nextQuarterMonth);
        scheduledDate.setDate(1);
        scheduledDate.setHours(9, 0, 0, 0);
    }
    
    return scheduledDate.toLocaleString('zh-CN');
}

// 初始化主动治理工作台弹窗
function initActiveGovernanceModal() {
    const closeBtn = document.getElementById('closeActiveGovernanceModal');
    const modal = document.getElementById('activeGovernanceModal');
    const helperBtn = document.getElementById('openHelperAssistant');
    
    if (closeBtn) {
        closeBtn.addEventListener('click', closeActiveGovernanceModal);
    }
    
    if (modal) {
        const overlay = modal.querySelector('.modal-overlay');
        if (overlay) {
            overlay.addEventListener('click', closeActiveGovernanceModal);
        }
    }
    
    if (helperBtn) {
        helperBtn.addEventListener('click', openHelperAssistant);
    }
    
    // 初始化帮办助手弹窗
    initHelperAssistant();
    
    // 初始化数据分析详情弹窗
    initDataDetailModal();
}

// 初始化帮办助手弹窗
function initHelperAssistant() {
    const closeBtn = document.getElementById('closeHelperAssistant');
    const modal = document.getElementById('helperAssistantModal');
    
    if (closeBtn) {
        closeBtn.addEventListener('click', closeHelperAssistant);
    }
    
    if (modal) {
        const overlay = modal.querySelector('.modal-overlay');
        if (overlay) {
            overlay.addEventListener('click', closeHelperAssistant);
        }
    }
}

// 打开帮办助手弹窗
function openHelperAssistant() {
    const modal = document.getElementById('helperAssistantModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

// 关闭帮办助手弹窗
function closeHelperAssistant() {
    const modal = document.getElementById('helperAssistantModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// 初始化AI报告弹窗
function initAIReportModal() {
    const closeBtn = document.getElementById('closeAIReport');
    const modal = document.getElementById('aiReportModal');
    
    if (closeBtn) {
        closeBtn.addEventListener('click', closeAIReportModal);
    }
    
    if (modal) {
        const overlay = modal.querySelector('.modal-overlay');
        if (overlay) {
            overlay.addEventListener('click', closeAIReportModal);
        }
    }
}

// 打开AI报告弹窗
function openAIReportModal() {
    const modal = document.getElementById('aiReportModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

// 关闭AI报告弹窗
function closeAIReportModal() {
    const modal = document.getElementById('aiReportModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// 打开主动治理工作台弹窗
function openActiveGovernanceModal() {
    const modal = document.getElementById('activeGovernanceModal');
    if (!modal) return;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    updateActiveGovernanceWorkbench();
}

// 关闭主动治理工作台弹窗
function closeActiveGovernanceModal() {
    const modal = document.getElementById('activeGovernanceModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// 更新主动治理工作台内容
function updateActiveGovernanceWorkbench() {
    const emptyState = document.getElementById('governanceEmptyState');
    const tasksList = document.getElementById('governanceTasksList');
    
    if (!emptyState || !tasksList) return;
    
    if (governanceTasks.length === 0) {
        emptyState.style.display = 'block';
        tasksList.style.display = 'none';
    } else {
        emptyState.style.display = 'none';
        tasksList.style.display = 'block';
        
        // 生成任务列表
        let html = '';
        governanceTasks.forEach(task => {
            html += `<div class="governance-task-item">
                <div class="task-header">
                    <div class="task-title">督办任务 #${task.id}</div>
                    <div class="task-time">${task.createTime}</div>
                </div>
                <div class="task-summary">
                    <div class="task-summary-title">数据分析摘要</div>
                    <div class="task-summary-content clickable-summary" data-task-id="${task.id}">
                        ${task.summary.substring(0, 200)}${task.summary.length > 200 ? '...' : ''}
                        <span class="view-detail-link">点击查看详情 →</span>
                    </div>
                </div>
                <div class="task-units">
                    <div class="task-units-title">推送单位 (${task.units.length}个)</div>
                    <div class="task-units-list">
                        ${task.units.map(unit => `<span class="task-unit-tag">${unit}</span>`).join('')}
                    </div>
                </div>
                <div class="task-frequency">
                    <span>推送频率:</span>
                    <span class="frequency-badge">${task.frequency}</span>
                    ${task.isScheduled && task.scheduledTime ? `<span style="margin-left: 15px; color: #7db8e6;">定时推送时间: ${task.scheduledTime}</span>` : ''}
                </div>
            </div>`;
        });
        
        tasksList.innerHTML = html;
        
        // 绑定点击查看详情事件
        tasksList.querySelectorAll('.clickable-summary').forEach(element => {
            element.addEventListener('click', function() {
                const taskId = parseInt(this.dataset.taskId);
                const task = governanceTasks.find(t => t.id === taskId);
                if (task) {
                    openDataDetailModal(task);
                }
            });
        });
    }
}

// 打开数据分析详情弹窗
function openDataDetailModal(task) {
    const modal = document.getElementById('dataDetailModal');
    const content = document.getElementById('dataDetailContent');
    
    if (!modal || !content) return;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // 生成详细的模拟数据
    const detailData = generateDetailData(task);
    
    let html = '';
    
    // 每日诉求概览详情
    html += '<div class="detail-section">';
    html += '<div class="detail-section-title">📊 每日诉求概览详情</div>';
    html += '<div class="detail-section-content">';
    html += '<div class="detail-stats-grid">';
    detailData.dailyStats.forEach(stat => {
        html += `<div class="detail-stat-card">
            <div class="stat-card-label">${stat.label}</div>
            <div class="stat-card-value">${stat.value}</div>
            <div class="stat-card-trend ${stat.trend > 0 ? 'up' : 'down'}">${stat.trend > 0 ? '↑' : '↓'} ${Math.abs(stat.trend)}%</div>
        </div>`;
    });
    html += '</div>';
    html += '<div class="detail-table-wrapper">';
    html += '<table class="detail-table">';
    html += '<thead><tr><th>问题类型</th><th>诉求数量</th><th>占比</th><th>环比变化</th><th>主要区域</th></tr></thead>';
    html += '<tbody>';
    detailData.dailyIssues.forEach(issue => {
        html += `<tr>
            <td>${issue.type}</td>
            <td>${issue.count}起</td>
            <td>${issue.percentage}%</td>
            <td class="${issue.change > 0 ? 'increase' : 'decrease'}">${issue.change > 0 ? '+' : ''}${issue.change}%</td>
            <td>${issue.mainRegion}</td>
        </tr>`;
    });
    html += '</tbody></table>';
    html += '</div>';
    html += '</div></div>';
    
    // 每周诉求概览详情
    html += '<div class="detail-section">';
    html += '<div class="detail-section-title">📈 每周诉求概览详情</div>';
    html += '<div class="detail-section-content">';
    html += '<div class="detail-chart-container" id="weeklyChartContainer"></div>';
    html += '<div class="detail-table-wrapper">';
    html += '<table class="detail-table">';
    html += '<thead><tr><th>区域</th><th>本周诉求</th><th>上周诉求</th><th>变化率</th><th>主要问题</th><th>处理进度</th></tr></thead>';
    html += '<tbody>';
    detailData.weeklyRegions.forEach(region => {
        html += `<tr>
            <td>${region.name}</td>
            <td>${region.thisWeek}起</td>
            <td>${region.lastWeek}起</td>
            <td class="${region.change > 0 ? 'increase' : 'decrease'}">${region.change > 0 ? '+' : ''}${region.change}%</td>
            <td>${region.mainIssue}</td>
            <td><div class="progress-bar"><div class="progress-fill" style="width: ${region.progress}%"></div></div> ${region.progress}%</td>
        </tr>`;
    });
    html += '</tbody></table>';
    html += '</div>';
    html += '</div></div>';
    
    // 每季度诉求概览详情
    html += '<div class="detail-section">';
    html += '<div class="detail-section-title">📋 每季度诉求概览详情</div>';
    html += '<div class="detail-section-content">';
    html += '<div class="detail-summary-cards">';
    detailData.quarterlySummary.forEach(summary => {
        html += `<div class="summary-card">
            <div class="summary-card-title">${summary.title}</div>
            <div class="summary-card-value">${summary.value}</div>
            <div class="summary-card-desc">${summary.description}</div>
        </div>`;
    });
    html += '</div>';
    html += '<div class="detail-table-wrapper">';
    html += '<table class="detail-table">';
    html += '<thead><tr><th>问题类型</th><th>本季度</th><th>上季度</th><th>增长率</th><th>平均处理时长</th><th>满意度</th></tr></thead>';
    html += '<tbody>';
    detailData.quarterlyIssues.forEach(issue => {
        html += `<tr>
            <td>${issue.type}</td>
            <td>${issue.thisQuarter}起</td>
            <td>${issue.lastQuarter}起</td>
            <td class="${issue.growth > 0 ? 'increase' : 'decrease'}">${issue.growth > 0 ? '+' : ''}${issue.growth}%</td>
            <td>${issue.avgTime}天</td>
            <td><span class="satisfaction-badge ${issue.satisfaction >= 80 ? 'high' : issue.satisfaction >= 60 ? 'medium' : 'low'}">${issue.satisfaction}%</span></td>
        </tr>`;
    });
    html += '</tbody></table>';
    html += '</div>';
    html += '</div></div>';
    
    // 预测诉求高发区域详情
    html += '<div class="detail-section">';
    html += '<div class="detail-section-title">🔮 预测诉求高发区域详情</div>';
    html += '<div class="detail-section-content">';
    html += '<div class="prediction-cards">';
    detailData.predictions.forEach(pred => {
        html += `<div class="prediction-card ${pred.riskLevel === '高' ? 'high-risk' : 'medium-risk'}">
            <div class="prediction-card-header">
                <span class="prediction-region-name">${pred.region}</span>
                <span class="prediction-risk-badge ${pred.riskLevel === '高' ? 'high' : 'medium'}">风险等级：${pred.riskLevel}</span>
            </div>
            <div class="prediction-card-body">
                <div class="prediction-item">
                    <span class="prediction-label">预测问题：</span>
                    <span class="prediction-value">${pred.issue}</span>
                </div>
                <div class="prediction-item">
                    <span class="prediction-label">预计诉求量：</span>
                    <span class="prediction-value">${pred.predictedCount}起/周</span>
                </div>
                <div class="prediction-item">
                    <span class="prediction-label">历史同期：</span>
                    <span class="prediction-value">${pred.historicalCount}起</span>
                </div>
                <div class="prediction-item">
                    <span class="prediction-label">预测依据：</span>
                    <span class="prediction-value">${pred.basis}</span>
                </div>
                <div class="prediction-item">
                    <span class="prediction-label">建议措施：</span>
                    <span class="prediction-value">${pred.suggestions}</span>
                </div>
            </div>
        </div>`;
    });
    html += '</div>';
    html += '</div></div>';
    
    content.innerHTML = html;
    
    // 生成图表
    setTimeout(() => {
        generateWeeklyChart(detailData.weeklyChartData);
    }, 100);
    
    modal.classList.add('active');
}

// 生成详细数据
function generateDetailData(task) {
    const regions = ['市中区', '薛城区', '峄城区', '台儿庄区', '山亭区', '滕州市'];
    const issueTypes = ['环境噪音', '道路积水', '垃圾清理', '停车位', '公共设施', '物业管理', '邻里纠纷', '安全隐患'];
    const streets = ['中心街街道', '临城街道', '坛山街道', '运河街道', '山城街道', '龙泉街道'];
    
    // 每日统计
    const dailyStats = [
        { label: '今日总诉求', value: '387起', trend: 5.2 },
        { label: '已处理', value: '312起', trend: 8.1 },
        { label: '处理中', value: '58起', trend: -3.5 },
        { label: '待处理', value: '17起', trend: -12.3 },
        { label: '平均响应时间', value: '2.3小时', trend: -15.6 },
        { label: '满意度', value: '92.5%', trend: 2.8 }
    ];
    
    // 每日问题详情
    const dailyIssues = issueTypes.slice(0, 6).map((type, index) => ({
        type: type + '问题',
        count: Math.floor(Math.random() * 80) + 20,
        percentage: ((Math.random() * 15 + 10).toFixed(1)),
        change: (Math.random() * 20 - 10).toFixed(1),
        mainRegion: regions[index % regions.length]
    }));
    
    // 每周区域统计
    const weeklyRegions = regions.map((region, index) => ({
        name: region,
        thisWeek: Math.floor(Math.random() * 400) + 200,
        lastWeek: Math.floor(Math.random() * 400) + 180,
        change: (Math.random() * 20 - 5).toFixed(1),
        mainIssue: issueTypes[index % issueTypes.length] + '问题',
        progress: Math.floor(Math.random() * 30) + 70
    }));
    
    // 每周图表数据
    const weeklyChartData = {
        days: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
        thisWeek: [45, 52, 48, 61, 55, 38, 42],
        lastWeek: [42, 48, 51, 58, 49, 40, 39]
    };
    
    // 季度摘要
    const quarterlySummary = [
        { title: '本季度总诉求', value: '28,456起', description: '较上季度增长3.2%' },
        { title: '月均诉求', value: '9,485起', description: '保持稳定水平' },
        { title: '平均处理时长', value: '2.1天', description: '较上季度缩短0.3天' },
        { title: '整体满意度', value: '91.8%', description: '较上季度提升2.5%' }
    ];
    
    // 季度问题统计
    const quarterlyIssues = issueTypes.map((type, index) => ({
        type: type + '问题',
        thisQuarter: Math.floor(Math.random() * 4000) + 2000,
        lastQuarter: Math.floor(Math.random() * 4000) + 1800,
        growth: (Math.random() * 15 - 5).toFixed(1),
        avgTime: (Math.random() * 2 + 1.5).toFixed(1),
        satisfaction: Math.floor(Math.random() * 20) + 75
    }));
    
    // 预测数据
    const predictions = [
        {
            region: '市中区-中心街街道',
            riskLevel: '高',
            issue: '环境噪音问题',
            predictedCount: 45,
            historicalCount: 38,
            basis: '历史数据显示该区域在同期环境噪音投诉量持续上升，结合近期天气和活动安排，预测未来一周将出现高发',
            suggestions: '提前部署噪音监测设备，加强夜间巡查，与相关单位协调降低噪音源'
        },
        {
            region: '薛城区-临城街道',
            riskLevel: '中',
            issue: '道路积水问题',
            predictedCount: 32,
            historicalCount: 28,
            basis: '根据天气预报和道路排水系统状况，预测可能出现积水问题',
            suggestions: '检查排水系统，准备应急排水设备，提前发布预警信息'
        },
        {
            region: '峄城区-坛山街道',
            riskLevel: '高',
            issue: '垃圾清理不及时',
            predictedCount: 38,
            historicalCount: 31,
            basis: '节假日期间垃圾产生量增加，结合历史数据预测清理压力增大',
            suggestions: '增加清运频次，延长作业时间，增设临时收集点'
        },
        {
            region: '台儿庄区-运河街道',
            riskLevel: '中',
            issue: '停车位不足',
            predictedCount: 28,
            historicalCount: 25,
            basis: '旅游旺季即将到来，预计停车需求大幅增加',
            suggestions: '开放临时停车场，加强停车管理，引导车辆分流'
        },
        {
            region: '滕州市-龙泉街道',
            riskLevel: '高',
            issue: '公共设施损坏',
            predictedCount: 35,
            historicalCount: 29,
            basis: '设施老化程度较高，结合使用频率预测可能出现集中报修',
            suggestions: '提前进行设施检修，准备维修材料，建立快速响应机制'
        }
    ];
    
    return {
        dailyStats,
        dailyIssues,
        weeklyRegions,
        weeklyChartData,
        quarterlySummary,
        quarterlyIssues,
        predictions
    };
}

// 生成每周图表
function generateWeeklyChart(chartData) {
    const container = document.getElementById('weeklyChartContainer');
    if (!container) return;
    
    const chart = echarts.init(container);
    const option = {
        tooltip: {
            trigger: 'axis',
            backgroundColor: 'rgba(15, 25, 50, 0.9)',
            borderColor: 'rgba(100, 180, 255, 0.5)',
            textStyle: { color: '#e8f4ff' }
        },
        legend: {
            data: ['本周', '上周'],
            textStyle: { color: '#e8f4ff' },
            top: 10
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: chartData.days,
            axisLine: { lineStyle: { color: 'rgba(100, 180, 255, 0.3)' } },
            axisLabel: { color: '#b8d4f0' }
        },
        yAxis: {
            type: 'value',
            axisLine: { lineStyle: { color: 'rgba(100, 180, 255, 0.3)' } },
            axisLabel: { color: '#b8d4f0' },
            splitLine: { lineStyle: { color: 'rgba(100, 180, 255, 0.1)' } }
        },
        series: [
            {
                name: '本周',
                type: 'line',
                data: chartData.thisWeek,
                smooth: true,
                lineStyle: { color: '#7db8e6', width: 2 },
                itemStyle: { color: '#7db8e6' },
                areaStyle: { color: 'rgba(125, 184, 230, 0.2)' }
            },
            {
                name: '上周',
                type: 'line',
                data: chartData.lastWeek,
                smooth: true,
                lineStyle: { color: '#b8d4f0', width: 2 },
                itemStyle: { color: '#b8d4f0' },
                areaStyle: { color: 'rgba(184, 212, 240, 0.1)' }
            }
        ]
    };
    
    chart.setOption(option);
    
    // 响应式调整
    window.addEventListener('resize', () => {
        chart.resize();
    });
}

// 关闭数据分析详情弹窗
function closeDataDetailModal() {
    const modal = document.getElementById('dataDetailModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// 初始化数据分析详情弹窗
function initDataDetailModal() {
    const closeBtn = document.getElementById('closeDataDetailModal');
    const modal = document.getElementById('dataDetailModal');
    
    if (closeBtn) {
        closeBtn.addEventListener('click', closeDataDetailModal);
    }
    
    if (modal) {
        const overlay = modal.querySelector('.modal-overlay');
        if (overlay) {
            overlay.addEventListener('click', closeDataDetailModal);
        }
    }
}

// 统一管理ESC键关闭弹窗（按z-index从高到低关闭）
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        // 按z-index从高到低检查并关闭弹窗
        const modals = [
            { id: 'predictionReasonModal', close: closePredictionReasonModal },
            { id: 'challengeIndexModal', close: closeChallengeIndexModal },
            { id: 'governanceEffectivenessModal', close: closeGovernanceEffectivenessModal },
            { id: 'populationRequestModal', close: closePopulationRequestModal },
            { id: 'supervisionEffectModal', close: closeSupervisionEffectModal },
            { id: 'demandDiversityModal', close: closeDemandDiversityModal },
            { id: 'concernedPopulationModal', close: closeConcernedPopulationModal },
            { id: 'governanceIndexModal', close: closeGovernanceIndexModal },
            { id: 'adminModal', close: closeAdminModal },
            { id: 'dataFusionModal', close: closeDataFusionModal },
            { id: 'aiAnalysisModal', close: closeAIAnalysisModal },
            { id: 'flexibleSupervisionModal', close: closeFlexibleSupervisionModal },
            { id: 'activeGovernanceModal', close: closeActiveGovernanceModal },
            { id: 'aiReportModal', close: closeAIReportModal },
            { id: 'helperAssistantModal', close: closeHelperAssistant },
            { id: 'dataDetailModal', close: closeDataDetailModal }
        ];
        
        // 找到第一个打开的弹窗并关闭
        for (let modal of modals) {
            const element = document.getElementById(modal.id);
            if (element && element.classList.contains('active')) {
                e.preventDefault();
                e.stopPropagation();
                modal.close();
                break;
            }
        }
    }
});


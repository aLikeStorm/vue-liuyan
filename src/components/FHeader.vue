<template>
    <div class="f-header">
        <span class="logo">
            <i class="el-icon-notebook-1 mr-5 ml-10"></i>
            网上留言簿——计算机网络知识
        </span>
        <div class="icon-btn"><i class="el-icon-refresh "></i></div>
        <div class="ml-auto flex items-center mr-15">
            <el-dropdown trigger="click">
                <span class="el-dropdown-link text-light-50">
                    用户管理<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item icon="el-icon-open">用户登入</el-dropdown-item>
                    <el-dropdown-item icon="el-icon-turn-off">用户退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>

<script>


</script>

<style>
.f-header {
    @apply flex items-center bg-light-blue-500 text-light-50 fixed top-0 left-0 right-0;
    height: 64px;
}

.logo {
    width: 400px;
    @apply flex items-center text-xl ml-5;
}

.icon-btn {
    @apply flex justify-center items-center;
    width: 42px;
    height: 64px;
    cursor: pointer;
}

.icon-btn:hover {
    @apply bg-light-blue-400;
}

.f-header.dropdown {
    height: 64px;
    cursor: pointer;
    @apply flex justify-center items-center mx-5
}
</style>
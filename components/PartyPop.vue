<template>
    <div>
        <div class="pop_section mb-[60px]">
            <div>
                <input type="text" class="border-b border-black w-full h-[40px]" name="" placeholder="제목을 설정해주세요"/>
            </div>
        </div>
        <div class="pop_section mb-[60px]">
            <div class="text-xl font-medium mb-[12px]">모임 정보 설정</div>
            <div class="text-sm font-light mb-[14px]">시간대 설정</div>
            <div class="mb-[40px]">
                <div class="overflow-auto pb-[10px] pt-[20px]" style="">
                    <div class="flex w-[1200px] relative"   >
                        <div  @click="toggle_on" class="boder_box w-[50px] h-[32px] relative cursor-pointer" v-for="n in 24">
                            <span class="num_box absolute top-[-22px]">{{ n-1 }}</span>
                        </div>
                        <span class="absolute right-0 top-[-22px] hidden">24</span>
                    </div>
                </div>   
            </div>
            <div class="text-sm font-light mb-[14px]">총 모임인원</div>
            <div class="flex w-[92px] h-[40px] items-center">
                <span @click="minus_num" class="cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="17" viewBox="0 0 14 17" fill="none">
                        <path d="M13.5 8.25784C13.5 8.82881 13.0531 9.2901 12.5 9.2901H1.5C0.946875 9.2901 0.5 8.82881 0.5 8.25784C0.5 7.68688 0.946875 7.22559 1.5 7.22559H12.5C13.0531 7.22559 13.5 7.68688 13.5 8.25784Z" fill="#333333"/>
                    </svg>
                </span>
                <input type="text" value="0" class="w-[50px] h-[40px] border-b text-center people_num border-black" @input="change_people"/>
                <span @click="plus_num" class="cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="16" viewBox="0 0 14 16" fill="none">
                        <path d="M8 2.5C8 1.94687 7.55312 1.5 7 1.5C6.44688 1.5 6 1.94687 6 2.5V7H1.5C0.946875 7 0.5 7.44688 0.5 8C0.5 8.55312 0.946875 9 1.5 9H6V13.5C6 14.0531 6.44688 14.5 7 14.5C7.55312 14.5 8 14.0531 8 13.5V9H12.5C13.0531 9 13.5 8.55312 13.5 8C13.5 7.44688 13.0531 7 12.5 7H8V2.5Z" fill="#333333"/>
                    </svg>
                </span>
            </div>
        </div>
        <div class="pop_section mb-[60px]">
            <div>
                <div class="text-xl font-medium mb-[12px]">방장 정보</div>
                <div class="text-sm font-light mb-[14px]">방장 이름</div>
                <div>
                    
                    <input type="text" class="border-b border-black w-full mb-[8px] h-[40px]" placeholder="이름을 입력해주세요" />
                </div>
                <div>
                    <label class="cursor-pointer">
                        <input type="checkbox" @input="check_email"/>
                        <span>이메일로 알림을 수신하시겠습니까?</span>
                    </label>
                </div>
            </div>
            <div class="mail_form mt-[35px] hidden">
                <div class="text-sm font-light mb-[14px]">이메일</div>
                <div class="flex items-center mb-[8px]">
                    <input type="text" class="border-b border-black w-[327px] h-[40px]" placeholder="example" />
                    <span class="inline-block mx-2">@</span>
                    <select class="w-[255px] h-[40px] border border-slate-300 rounded-lg pl-[8px]">
                        <option value="">선택</option>
                        <option value="gmail.com">gmail.com</option>
                        <option value="naver.com">naver.com</option>
                    </select>
                </div>
                <div>
                    <input type="checkbox"/>
                    <span>개인정보이용에 동의합니다.</span>
                </div>
            </div>
            
        </div>
        <div>
            <button class="px-[41px] py-[13px] bg-[#2A9DF4] rounded-lg text-white">모임 생성</button>
        </div>
    </div>
</template>
<script setup>
    const props = defineProps({
        blank: {
            type: Boolean,
            required: false,
            default: false,
        },
    });
</script>
<script>
//import axios from "axios";


export default {
    name: "Header",

    data: () =>{
        
    },
    methods : {
        check_email(event){
            if( event.target.checked ) {
                document.querySelector('.mail_form').style.display = 'block';
            }
            else{
                document.querySelector('.mail_form').style.display = 'none';
            }
        },
        minus_num(){
            let p_num = parseInt(document.querySelector('.people_num').value) - 1;
            document.querySelector('.people_num').value = p_num < 1 ? 0 : p_num;
        },
        plus_num(){
            let p_num = parseInt(document.querySelector('.people_num').value) + 1;
            document.querySelector('.people_num').value = p_num < 1 ? 0 : p_num;
        },
        change_people(event){
            let p_num = event.target.value;
            const regex = /[^0-9]/g;
            let result = p_num.replace(regex, "");
            p_num = parseInt(result);    
            event.target.value = p_num;
        },
        toggle_on(event){
            //let idx = event.target.querySelector('span').textContent;
            //선택한 개수에 따라 분기처리
            let on_cnt = document.querySelectorAll('.boder_box.on').length;
            
            if( on_cnt == 0 ) {
                event.target.classList.add('on');
            }
            else if( on_cnt == 1 ) {
                
                let target_idx = Array.from(document.querySelectorAll('.boder_box')).indexOf(event.target);
                let current_idx = Array.from(document.querySelectorAll('.boder_box')).indexOf(document.querySelector('.boder_box.on'));
                
                //클릭값과 기존값이 같다면
                if( target_idx == current_idx ) {
                    event.target.classList.remove('on');
                }
                else{
                    Array.from(document.querySelectorAll('.boder_box')).map((ele,idx)=>{
                        
                        if( target_idx > current_idx ) {    //클릭값이 현재값보다 크다면
                            if( idx > current_idx && idx <= target_idx ) {
                                ele.classList.add('on');
                            }
                        }
                        else {  // 작다면
                            if( idx < current_idx && idx >= target_idx ) {
                                ele.classList.add('on');
                            }
                        }
                    })
                }
            }
            else {
                Array.from(document.querySelectorAll('.boder_box')).map((ele,idx)=>{
                    ele.classList.remove('on');
                    event.target.classList.add('on');
                })
            }
            
        }
    }
}
</script>

<style>
    .boder_box.on{
        background-color: #AAD8FB;
    }
    .boder_box{
        box-sizing: border-box;
        border: 1px solid #2A9DF4;
    }
    .boder_box:last-child{
        border-radius: 0px 4px 4px 0px;
    }
    .boder_box:first-child{
        border-radius: 4px 0px 0px 4px;
    }
 
    ::-webkit-scrollbar {
        height: 19.58px; 
        background: #AAD8FB;
    }
    ::-webkit-scrollbar-thumb {
        background: #2A9DF4; /* 스크롤바 막대 색상 */
        border: 1px solid #2A9DF4; /* 스크롤바 막대 테두리 설정  */
        border-radius: 12px 12px 12px 12px;
        cursor: pointer;
        width: 40px;  /* 세로축 스크롤바 폭 너비 */
        height: 40px; 
    }
</style>

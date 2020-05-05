{/* 카테고리 리스트 */}
export var category_map = new Map();
category_map.set("cat_1" , "[목록]전자제품(모델별 1개만 통관가능)")
category_map.set("cat_2" , "[목록]의류/패션잡화")
category_map.set("cat_3" , "[목록]생활용품")
category_map.set("cat_4" , "[목록]유아용품")
category_map.set("cat_5" , "[일반]식품류/주류")
category_map.set("cat_6" , "[일반]담배/커피")
category_map.set("cat_7" , "[일반]건강기능식품(6개까지만)/한약재")
category_map.set("cat_8" , "[일반]의약품(6병까지만)/의약외품")
category_map.set("cat_9" , "[목록]문구/완구류")
category_map.set("cat_10", "[일반]바디(데오드란트)/기능성 헤어(탈모방지, 발모)")
category_map.set("cat_11", "[목록]바디/헤어")
category_map.set("cat_12", "[목록]화장품/향수 60mm이하")
category_map.set("cat_13", "[일반]화장품/향수 60mm초과")
category_map.set("cat_14", "[목록]서적/CD")
category_map.set("cat_15", "[목록]가구/조명/침구/커텐")
category_map.set("cat_16", "[목록]주방용품")
category_map.set("cat_17", "[목록]스포츠/레져/텐트용품")
category_map.set("cat_18", "[목록]악기")
category_map.set("cat_19", "[목록]자동차용품")
category_map.set("cat_20", "[목록]예술품/수집품")
category_map.set("cat_21", "[일반]검역대상/동식물류")
category_map.set("cat_22", "[목록/일반]기타(상담필요)")

export const CATEGORY_LIST = [
    category_map.get("cat_1"), category_map.get("cat_2"), category_map.get("cat_3"),
    category_map.get("cat_4"), category_map.get("cat_5"), category_map.get("cat_6"),
    category_map.get("cat_7"), category_map.get("cat_8"), category_map.get("cat_9"),
    category_map.get("cat_10"), category_map.get("cat_11"), category_map.get("cat_12"),
    category_map.get("cat_13"), category_map.get("cat_14"), category_map.get("cat_15"),
    category_map.get("cat_16"), category_map.get("cat_17"), category_map.get("cat_18"),
    //category_map.get("cat_19"), category_map.get("cat_20"), category_map.get("cat_21"),
    //category_map.get("cat_22"), 
    ]

{/* 배송회사 */}
export const DELIVERY_COMPANY_LIST = [
    "DHL",
    "헤르메스",
    "기타", 
    ]

{/* 품목 리스트 */}
export function getItemTitleList(categoryTitle) {
    switch (categoryTitle) {
        case category_map.get("cat_1"):
            return CATEGORY_1_ITEM_LIST;
        case category_map.get("cat_2"):
            return CATEGORY_2_ITEM_LIST;
        case category_map.get("cat_3"):
            return CATEGORY_3_ITEM_LIST;
        case category_map.get("cat_4"):
            return CATEGORY_4_ITEM_LIST;
        case category_map.get("cat_5"):
            return CATEGORY_5_ITEM_LIST;
        case category_map.get("cat_6"):
            return CATEGORY_6_ITEM_LIST;
        case category_map.get("cat_7"):
            return CATEGORY_7_ITEM_LIST;
        case category_map.get("cat_8"):
            return CATEGORY_8_ITEM_LIST;
        case category_map.get("cat_9"):
            return CATEGORY_9_ITEM_LIST;
        case category_map.get("cat_10"):
            return CATEGORY_10_ITEM_LIST;
        case category_map.get("cat_11"):
            return CATEGORY_11_ITEM_LIST;
        case category_map.get("cat_12"):
            return CATEGORY_12_ITEM_LIST;
        case category_map.get("cat_13"):
            return CATEGORY_13_ITEM_LIST;
        case category_map.get("cat_14"):
            return CATEGORY_14_ITEM_LIST;
        case category_map.get("cat_15"):
            return CATEGORY_15_ITEM_LIST;
        case category_map.get("cat_16"):
            return CATEGORY_16_ITEM_LIST;
        case category_map.get("cat_17"):
            return CATEGORY_17_ITEM_LIST;
        case category_map.get("cat_18"):
            return CATEGORY_18_ITEM_LIST;
        case category_map.get("cat_19"):
            return CATEGORY_19_ITEM_LIST;
        case category_map.get("cat_20"):
            return CATEGORY_20_ITEM_LIST;
        case category_map.get("cat_21"):
            return CATEGORY_21_ITEM_LIST;
        case category_map.get("cat_22"):
            return CATEGORY_22_ITEM_LIST;
    }
}

//전자제품
export const CATEGORY_1_ITEM_LIST = [
    "휴대폰/스마트폰/전화기",
    "인덕션/전자렌지",
    "스마트워치",
    "헤드셋/이어폰/MPS",
    "전자수첩/사전/계산기",
    "TV(접수규격 초과시 배송불가)",
    "냉장고/세탁시/청소기",
    "가습기/제습기/공기청정기",
    "손전등/전등공구",
    "재봉기/재봉틀",
    "전기다리미/난방기",
    "전동칫솔/면도기",
    "면도기/제모기/레이져 피부관리기",
    "헤어드라이기/세팅기",
    "토스터/오븐/그릴",
    "전기 커피메이커",
    "식품용 그라인더/믹서/착즙기",
    "기타 전자기기",
    "노트북/태블릿/데스크탑/PC부품",
    "기타 전자제품"
]

//의류/패션잡화
export const CATEGORY_2_ITEM_LIST = [
    "일반의류",
    "유아용 의류",
    "인조모피 의류",
    "속옷",
    "신발",
    "시계",
    "가방",
    "지갑",
    "모자",
    "스타킹/양말",
    "벨트",
    "넥타이/스카프",
    "장갑/손수건",
    "타월/원단",
    "안경/선글라스",
    "기타 악세서리",
    "기타 의류/패션잡화"
]

//생활용품
export const CATEGORY_3_ITEM_LIST = [
    "캐리어",
    "세탁세제/주방세제",
    "마스크",
    "섬유유연제",
    "면도용용품(크림,쉐이빙,폼)",
    "면도기",
    "비데",
    "치실",
    "칫솔/전동칫솔",
    "화장지",
    "체중계",
    "가정용공구", 
    "기타 생활용품",
]

//유아용품
export const CATEGORY_4_ITEM_LIST = [
    "유아용화장품",
    "보행기",
    "유모차",
    "카시트",
    "유모차부품",
    "수유관련용품",
    "젖병류",
    "유아용 안전용품",
    "기타 유아용용퓸",
]

//식품류/주류
export const CATEGORY_5_ITEM_LIST = [
    "조제분유(5kg까지)",
    "이유식(채소류)",
    "이유식(육류/과실/견과류)",
    "초콜릿/캔디/젤리",
    "비스킷/쿠키/크래커",
    "소스/올리브유",
    "향신료",
    "쨈",
    "인조꿀(6병까지)",
    "천연꿀(5kg까지)",
    "차(Tee)",
    "가루믹스(코코아/기타)",
    "주스",
    "소주/맥주",
    "위스키/보드카/데킬라",
    "와인",
    "과실주/발효주",
    "기타 식품류/주류",
]

//담배/커피
export const CATEGORY_6_ITEM_LIST = [
    "담배",
    "전자담배 기기",
    "전자담배 용액(20ml초과 관부가세발생)",
    "인스턴트 커피",
    "캡슐커피",
    "볶은 커피",
    "볶지 않은 커피",
    "기타 담배/커피",
]

//건강기능식품
export const CATEGORY_7_ITEM_LIST = [
    "비타민/영양제(6병까지)",
    "다이어트 제품(6병까지)",
    "기타 건강기능식품",
]

//의약품
export const CATEGORY_8_ITEM_LIST = [
    "바르는 연고",
    "바세린",
    "치약/구강세정제",
    "렌즈 세정액",
    "탈모방지 비누/샴푸",
    "데오드란트",
    "제모제",
    "생리대/생리컵",
    "일회용 기저귀",
    "붕대/안대/반창고",
    "애완용 구충제(6개까지만)",
    "기타 의약품",
]

//문구/완구류
export const CATEGORY_9_ITEM_LIST = [
    "완구(장난감)",
    "비디오게임용구",
    "오락용품",
    "인형",
    "조립식완구(레고 등)",
    "필기구",
    "바퀴가 있는 완구",
    "기타 문구/완구류",
]

//바디(데오드란트)/기능성 헤어
export const CATEGORY_10_ITEM_LIST = [
    "데오드란트",
    "탈모방지(비누/샴푸)",
    "제모제",
    "기타 바디(데오드란트)/기능성 헤어",
]

//바디/헤어
export const CATEGORY_11_ITEM_LIST = [
    "비누/클렌져/바디워시",
    "샴푸/린스/헤어제품",
    "기타 바디/헤어",
]

//화장품/향수 60mm이하
export const CATEGORY_12_ITEM_LIST = [
    "향수",
    "기초화장품(스프레이발송불가)",
    "색조화장품",
    "화장품 도구",
    "화장용 티슈",
    "기타 화장품/향수",
]

//화장품/향수 60mm초과
export const CATEGORY_13_ITEM_LIST = [
    "향수",
    "기초화장품(스프레이발송불가)",
    "색조화장품",
    "화장품 도구",
    "화장용 티슈",
    "기타 화장품/향수",
]

//서적/CD
export const CATEGORY_14_ITEM_LIST = [
    "책/잡지류",
    "음반 CD/DVD/Blueray",
    "영화 CD/DVD/Blueray",
    "게임 CD/DVD/Blueray",
    "기타 서적/CD",
]

//가구/조명/침구/커텐
export const CATEGORY_15_ITEM_LIST = [
    "가구",
    "식탁",
    "의자",
    "조명",
    "침대매트리스",
    "쿠션/배게/방석",
    "양탄자/러그",
    "이불",
    "커튼",
    "기타 가구/조명/침구/커텐",
]

//주방용품
export const CATEGORY_16_ITEM_LIST = [
    "식기/주방용품(나무/금속/유리.자기)",
    "식기/주방용품(플라스틱)",
    "스푼/포크/칼",
    "그라인더/믹서",
    "전기 커피메이커",
    "기타 주방용품",
]

//스포츠 레져
export const CATEGORY_17_ITEM_LIST = [
    "수영용품",
    "낚시용품",
    "야구용품",
    "등산용품",
    "골프용품",
    "스키/보드용품",
    "자전거용품",
    "스포츠 의류/신발",
    "수영복",
    "수상스키/윈드서핑용품",
    "스케이드용품",
    "라켓",
    "공",
    "캠핑용품",
    "기타 스포츠/레져용품",
]

//악기
export const CATEGORY_18_ITEM_LIST = [
    "악기 부품",
    "타악기",
    "현악기",
    "관악기",
    "전자악기",
    "기타 악기",
]

//자동차 용품
export const CATEGORY_19_ITEM_LIST = [
    "자동차 부품",
    "자동차 오일/엔진오일",
    "타이어(신품)",
    "타이어(재생품)",
    "기타 자동차용품",
]

//예술품
export const CATEGORY_20_ITEM_LIST = [
    "그림",
    "장식품",
    "일반도자제품",
    "골동품",
    "기타 예술품",
]

//검역대상/동식물류
export const CATEGORY_21_ITEM_LIST = [
    "",
]

//기타(상담필요)
export const CATEGORY_22_ITEM_LIST = [
    "기타",
]


        
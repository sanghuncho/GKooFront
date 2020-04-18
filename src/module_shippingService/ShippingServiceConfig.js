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
    category_map.get("cat_19"), category_map.get("cat_20"), category_map.get("cat_21"),
    category_map.get("cat_22"), 
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

export const CATEGORY_1_ITEM_LIST = [
    "휴대폰/스마트폰/전화기",
    "인덕션/전자렌지",
    "스마트워치",
    "헤드셋/이어폰/MPS", 
]

export const CATEGORY_2_ITEM_LIST = [
    "일반의류",
    "유아용 의류",
    "인조모피 의류",
    "속옷",
    "신발",
    "시계",
]

export const CATEGORY_3_ITEM_LIST = [
    "",
]

export const CATEGORY_4_ITEM_LIST = [
    "",
]

export const CATEGORY_5_ITEM_LIST = [
    "",
]

export const CATEGORY_6_ITEM_LIST = [
    "",
]

export const CATEGORY_7_ITEM_LIST = [
    "",
]

export const CATEGORY_8_ITEM_LIST = [
    "",
]

export const CATEGORY_9_ITEM_LIST = [
    "",
]

export const CATEGORY_10_ITEM_LIST = [
    "",
]

export const CATEGORY_11_ITEM_LIST = [
    "",
]

export const CATEGORY_12_ITEM_LIST = [
    "",
]

export const CATEGORY_13_ITEM_LIST = [
    "",
]

export const CATEGORY_14_ITEM_LIST = [
    "",
]

export const CATEGORY_15_ITEM_LIST = [
    "",
]

export const CATEGORY_16_ITEM_LIST = [
    "",
]

export const CATEGORY_17_ITEM_LIST = [
    "",
]

export const CATEGORY_18_ITEM_LIST = [
    "",
]

export const CATEGORY_19_ITEM_LIST = [
    "",
]

export const CATEGORY_20_ITEM_LIST = [
    "",
]

export const CATEGORY_21_ITEM_LIST = [
    "",
]

export const CATEGORY_22_ITEM_LIST = [
    "",
]


        
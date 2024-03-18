/** 랜덤 ID 생성 */
export const generateId = (length: number) => {
    const hexNumbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    let result = '';
    
    for(let i = 0; i < length; i++){
		const randomIndex = Math.floor(Math.random() * hexNumbers.length);
        result += hexNumbers[randomIndex];
	}
    return result;
}

/** 문자열에서 특정 문자 제거 */
export function removeStr(string: string, target: string) {
    return string.replace(target, "");
}

/** 이메일 패턴 */
export function emailValidChk(email: string) {
    const emailPattern = /^[A-Za-z0-9_.-]+@[A-Za-z0-9-]+\.[A-Za-z0-9-]+/;
    return emailPattern.test(email);
}

/** getDay()에서 요일 반환 */
export function dayIntoWeekday(day: number) {
    if (day === 0) return "일";
    else if (day === 1) return "월";
    else if (day === 2) return "화";
    else if (day === 3) return "수";
    else if (day === 4) return "목";
    else if (day === 5) return "금";
    else if (day === 6) return "토";
}
/** 랜덤 ID 생성 */
export const generateId = () => {
    const hexNumbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    let result = '';
    
    for(let i=0; i<6; i++){
		const randomIndex = Math.floor(Math.random() * hexNumbers.length);
        result += hexNumbers[randomIndex];
	}
    return result;
}

/** 문자열에서 숫자 추출 */
export function getIntFromString(string: string) {
    const regex = /[^0-9]/g;
    const result = string.replace(regex, '');
    return parseInt(result);
}

/** 문자열에서 특정 문자 제거 */
export function removeStr(string: string, target: string) {
    return string.replace(target, "");
}
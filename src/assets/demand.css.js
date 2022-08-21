import styled from "styled-components";

export const DataGridContainer = styled.div`
    
`;
export const HeaderContent = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 15px;
`;
export const DataGridFilterContent = styled.div`
    display: flex;
    flex-direction: column;
`;
export const FilterRow = styled.div`
    padding-bottom: 15px;
`;
export const FilterCol= styled.div`
    flex: 0 0 25%;
    @media (max-width: 834px) {
        flex: 0 0 100%;
        padding-bottom: 10px;
        &:last-child{
            padding-bottom: 0px;
        }
    }
`;
export const SearchFilter = styled.div`
    width: 100%;
    padding-bottom: 10px;
    justify-content: flex-end;
    display: flex;
    & .form-control{
        width: 200px;
        @media (max-width: 834px) {
            width: 100%;
        }
    }
`;
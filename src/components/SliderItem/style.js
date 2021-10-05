import styled from "styled-components/native";

export const Container = styled.TouchableOpacity`
  padding-top: 16px;
  padding-right: 16px;
  padding-bottom: 16px;
  width: 140px;
  height: 180px;
`;

export const BannerItem = styled.Image`
  height: 150px;
  width: 100%;
  border-radius: 8px;
`;

export const Title = styled.Text`
  color: #FFF;
  font-size: 14px;
  padding-top: 8px;
`;

export const RateContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Rate = styled.Text`
  padding-left: 4px;
  color: #FFF;
  font-size: 12px;
`;

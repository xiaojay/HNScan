import React from "react";
import styled from "styled-components";
import { Row, Col, Card, Skeleton } from "@urkellabs/ucl";
import { useTranslation } from "react-i18next";

// Components
import StackedData from "components/shared/StackedData";

// Util
import { hnsValues } from "utils/util";

const AddressWrapper = styled.div`
  width: 100%;
  word-wrap: break-word;
  margin-bottom: 20px;
  padding: 10px;
`;

const AddressHash = styled.div`
  font-size: 16px;
  max-width: 400px;
`;

const AddressTitle = styled(AddressHash)`
  font-weight: 700;
`;

const SkeletonWrapper = styled.div`
  width: 225px;
`;

export default function AddressSummary({ hash, received, spent, confirmed }) {
  const { t } = useTranslation();
  return (
    <>
      <AddressWrapper>
        <AddressTitle>{t("address_detail.address")}</AddressTitle>
        <AddressHash>{hash || <Skeleton />}</AddressHash>
      </AddressWrapper>
      <Card title={t("address_detail.summary")}>
        <Row>
          <Col mobile={12} tablet>
            <StackedData
              label="address_detail.balance"
              value={
                hnsValues(confirmed) || (
                  <SkeletonWrapper>
                    <Skeleton />
                  </SkeletonWrapper>
                )
              }
            />
          </Col>
          <Col mobile={12} tablet>
            <StackedData
              label="address_detail.received"
              value={
                hnsValues(received) || (
                  <SkeletonWrapper>
                    <Skeleton />
                  </SkeletonWrapper>
                )
              }
            />
          </Col>
          <Col mobile={12} tablet>
            <StackedData
              label="address_detail.spent"
              value={
                hnsValues(spent) || (
                  <SkeletonWrapper>
                    <Skeleton />
                  </SkeletonWrapper>
                )
              }
            />
          </Col>
        </Row>
      </Card>
    </>
  );
}

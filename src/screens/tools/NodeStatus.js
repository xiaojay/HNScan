import React, { Suspense } from "react";
import styled from "styled-components";
import humanizeDuration from "humanize-duration";
import {
  Card,
  Table,
  Modal,
  Text,
  Code,
  HelpIcon,
  useQuery
} from "@urkellabs/ucl";
import { useTranslation } from "react-i18next";

// Components
import StackedData from "components/shared/StackedData";

// Hooks
import useRoutedModal from "hooks/useRoutedModal";

// Util
import { sciNotation, formatLargeNumber } from "utils/util";

const Help = styled(HelpIcon)`
  height: 20px;
  width: 15px;
  margin-left: 20px;
  cursor: pointer;
`;

//@todo move this somewhere else?
function ConnectHelp(props) {
  return (
    <Modal
      show={props.showModal}
      closeFunction={props.toggleModal}
      title={"Connecting to this node"}
    >
      <p>
        This node's IP is <Code copy>{props.ip}</Code> and identity key is:{" "}
        <Code copy>{props.idkey}</Code>
      </p>
      <Text>
        To add this node to your outbound connections, run the following:
        <Code copy shell>
          {`hsd-cli rpc addnode ${props.idkey}@${props.ip} add`}
        </Code>
        If you do not have hsd-cli installed, follow these{" "}
        <a
          href="https://handshake-org.github.io/guides/mac-install.html#hsd-installation-instructions"
          target="_blank"
          rel="noopener noreferrer"
        >
          instructions
        </a>
        .
      </Text>
    </Modal>
  );
}

const NodeStatusContainer = () => {
  let [showModal, toggleModal] = useRoutedModal("connect");

  const { data: status } = useQuery("/status/");
  const { t } = useTranslation();
  let [difficulty, exponent] = sciNotation(status.difficulty, 5);
  let totalDownloaded = formatLargeNumber(status.totalBytesRecv, 2);
  let totalUploaded = formatLargeNumber(status.totalBytesSent, 2);

  return (
    <>
      <Card title={t("node_status.node_status")}>
        <Table>
          <Table.Body>
            <Table.Tr>
              <StackedData
                cell
                label="node_status.host"
                value={
                  <>
                    {status.key}@{status.host}:{status.port}
                    <Help circle onClick={toggleModal} />
                  </>
                }
              />
            </Table.Tr>
            <Table.Tr>
              <StackedData
                cell
                label="node_status.network"
                value={status.network}
              />
            </Table.Tr>
            <Table.Tr>
              <StackedData
                cell
                label="node_status.chain_progress"
                value={status.progress}
              />
            </Table.Tr>
            <Table.Tr>
              <StackedData
                cell
                label="node_status.version"
                value={`${status.version} (${status.agent})`}
              />
            </Table.Tr>
            <Table.Tr>
              <StackedData
                cell
                label="node_status.connections"
                value={status.connections}
              />
            </Table.Tr>
            <Table.Tr>
              <StackedData
                cell
                label="node_status.difficulty"
                value={
                  <span>
                    {difficulty} x 10<sup>{exponent}</sup>
                  </span>
                }
              />
            </Table.Tr>
            <Table.Tr>
              <StackedData
                cell
                label="node_status.uptime"
                value={humanizeDuration(status.uptime * 1000)}
              />
            </Table.Tr>
            <Table.Tr>
              <StackedData
                cell
                label="node_status.total_downloaded"
                value={
                  totalDownloaded[0] + " " + totalDownloaded[1].name + "bytes"
                }
              />
            </Table.Tr>
            <Table.Tr>
              <StackedData
                cell
                label="node_status.total_uploaded"
                value={totalUploaded[0] + " " + totalUploaded[1].name + "bytes"}
              />
            </Table.Tr>
          </Table.Body>
        </Table>
      </Card>
      <ConnectHelp
        showModal={showModal}
        toggleModal={toggleModal}
        ip={`${status.host}:${status.port}`}
        idkey={status.key}
      />
    </>
  );
};

//Modal here should be it's own screen... Accessible via a Hash Router.
export default function NodeStatus() {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <NodeStatusContainer />
      </Suspense>
    </>
  );
}

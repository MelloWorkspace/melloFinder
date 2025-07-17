import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
	Button,
	Accordion,
	AccordionSummary,
	AccordionDetails,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import cn from "classnames";
import styles from "./page-error.module.scss";

interface PageErrorProps {
	error?: Error;
}

const PageError = ({ error }: PageErrorProps) => {
	const { t } = useTranslation();
	const [expanded, setExpanded] = useState(false);

	const reloadPage = () => location.reload();

	const copyError = async () => {
		if (error) {
			await navigator.clipboard.writeText(error.stack || error.message);
		}
	};

	return (
		<div className={cn(styles.pageErrorWrapper)}>
			<div className={cn(styles.pageErrorContent)}>
				<p className={cn(styles.pageErrorTitle)}>
					{t("exceptions.just-error")}
				</p>

				{error && (
					<div className={cn(styles.errorDetails)}>
						<Accordion
							expanded={expanded}
							onChange={() => setExpanded(!expanded)}
						>
							<AccordionSummary expandIcon={<ExpandMoreIcon />}>
								{t("exceptions.details")}
							</AccordionSummary>
							<AccordionDetails>
								<pre className={cn(styles.errorStack)}>
									{error.stack || error.message}
								</pre>
								<Button
									startIcon={<ContentCopyIcon />}
									onClick={copyError}
									variant="outlined"
									sx={{ mt: 1 }}
								>
									{t("buttons.copy-error")}
								</Button>
							</AccordionDetails>
						</Accordion>
					</div>
				)}

				<Button onClick={reloadPage} variant="contained" sx={{ mt: 3 }}>
					{t("buttons.reload-page")}
				</Button>
			</div>
		</div>
	);
};

export default PageError;

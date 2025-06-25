import PageContainer from '../../base/contentContainers/PageContainer';
import CardContainer from '../../base/contentContainers/CardContainer';
import defIco from '../../../../public/icons/defLogo.svg';

import './AnalyzePage.css';

export default function AnalyzePage({ company }) {
  if (!company) {
    return (
      <PageContainer>
        <div></div>
        <CardContainer>
          <h1>Данные анализа не найдены</h1>
        </CardContainer>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      {/* Шапка компании */}
      <div>
        <CardContainer>
          <div className="company-header">
            <div className="company-logo">
              <img
                src={company.logoUrl || defIco}
                alt="Логотип"
                onError={(e) => e.target.src = defIco}
              />
            </div>
            <div className="company-title">
              <h3>{company.tagline}</h3>
              <h1>{company.name}</h1>
            </div>
          </div>
        </CardContainer>
      </div>

      <div style={{ "paddingBottom": "25px" }}>

        <div style={{ "marginTop": "25px", "marginBottom": "25px" }}>
          <CardContainer>
            <h1>Общий анализ</h1>
            <p className="analyze-text">{company.reviewsSummary}</p>
          </CardContainer>
        </div>

        <div style={{ "marginTop": "25px", "marginBottom": "25px" }}>
          <div style={{ marginTop: "25px", marginBottom: "25px" }}>

            {(() => {
              const items = company.sources;
              const result = [];

              for (let i = 0; i < items.length; i += 3) {
                const link = items[i];
                const title = items[i + 1];
                const description = items[i + 2];

                if (link && title && description) {
                  result.push(
                    <div style={{ "marginTop": "25px", "marginBottom": "25px" }} key={i}>
                      <CardContainer >
                        <a href={link} target="_blank" rel="noopener noreferrer"
                          style={{ color: '#007bff', textDecoration: 'underline', "marginTop": "25px" }}>
                          {title}
                        </a>
                        <p>{description}</p>
                      </CardContainer>
                    </div>
                  );
                }
              }

              return result;
            })()}
          </div>

        </div>

      </div>

    </PageContainer>
  );
}